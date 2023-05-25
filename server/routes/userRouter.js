const Router = require("express").Router;
const userRouter = Router();
const User = require("../models/user");
const Image = require("../models/image");
const { hash, compare } = require("bcryptjs");
const mongoose = require("mongoose");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password < 6)
      throw new Error("Password must be at least 6 characters");
    if (req.body.username.length < 3)
      throw new Error("Username must be at least 3 characters");
    const hashedPassword = await hash(req.body.password, 10);
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
      sessions: [{ createdAt: new Date() }],
    }).save();
    const session = user.sessions[0];

    res.json({
      message: "user registered",
      sessionId: session._id,
      name: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new Error("입력하신 정보가 올바르지 않습니다.");
    const isValid = await compare(req.body.password, user.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
    user.sessions.push({ createdAt: new Date() });
    const session = user.sessions[user.sessions.length - 1];
    await user.save();
    res.json({
      message: "user validated",
      sessionId: session._id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch("/logout", async (req, res) => {
  try {
    const user = req.user;
    const sessionid = req.headers.sessionid;
    if (!user) throw new Error("invalid sessionid");
    await User.updateOne(
      { _id: user.id },
      { $pull: { sessions: { _id: sessionid } } }
    );
    res.json({ message: "user is logged out." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/me", (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new Error("invalid sessionid");
    res.json({
      message: "success",
      sessionId: req.headers.sessionid,
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

userRouter.get("/me/images", async (req, res) => {
  try {
    if (!req.user) throw new Error("권한이없습니다.");

    const { lastid } = req.query;
    if (lastid && !mongoose.isValidObjectId(lastid))
      throw new Error("invalid lastid");

    const images = await Image.find(
      lastid
        ? { "user._id": req.user._id, _id: { $lt: lastid } }
        : { "user._id": req.user._id }
    )
      .sort({ _id: -1 })
      .limit(3);
    res.json(images);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
