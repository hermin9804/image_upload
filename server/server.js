require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");

const app = express();
const { MONGO_URI, PORT } = process.env;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.use("/uploads", express.static("uploads"));

    app.use("/images", imageRouter);

    app.listen(PORT, () => {
      console.log("Server is running on Port: " + PORT);
    });
  })
  .catch((err) => console.log(err));
