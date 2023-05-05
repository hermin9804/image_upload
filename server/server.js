require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");
const mongoose = require("mongoose");
const Image = require("./models/image");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, `${uuid()}.${mime.extension(file.mimetype)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid file type."), false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

const app = express();
const PORT = 5001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");

    app.use("/uploads", express.static("uploads"));

    app.post("/images", upload.single("image"), async (req, res) => {
      const image = await new Image({
        key: req.file.filename,
        originalName: req.file.originalname,
      }).save();
      res.json(image);
    });

    app.get("/images", async (req, res) => {
      const images = await Image.find();
      res.json(images);
    });

    app.listen(PORT, () => {
      console.log("Server is running on Port: " + PORT);
    });
  })
  .catch((err) => console.log(err));
