const Router = require("express").Router;
const userRouter = Router();
const User = require("../models/user");
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
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
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

module.exports = { userRouter };
