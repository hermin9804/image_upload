const Router = require("express").Router;
const userRouter = Router();
const User = require("../models/user");

userRouter.post("/register", async (req, res) => {
  await new User(req.body).save();
  res.json({ message: "user registered" });
});

module.exports = { userRouter };
