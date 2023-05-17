const Router = require("express").Router;
const userRouter = Router();
const User = require("../models/user");
const { hash, compare } = require("bcryptjs");

userRouter.post("/register", async (req, res) => {
  try {
    if (req.body.password < 6)
      throw new Error("Password must be at least 6 characters");
    if (req.body.username.length < 3)
      throw new Error("Username must be at least 3 characters");
    const hashedPassword = await hash(req.body.password, 10);
    await new User({
      name: req.body.name,
      username: req.body.username,
      hashedPassword,
    }).save();
    res.json({ message: "user registered" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    const isValid = await compare(req.body.password, user.hashedPassword);
    if (!isValid) throw new Error("입력하신 정보가 올바르지 않습니다.");
    res.json({ message: "user validated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
