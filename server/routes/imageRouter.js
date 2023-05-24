const { Router } = require("express");
const imageRouter = Router();
const Image = require("../models/image");
const { upload } = require("../middleware/imageUpload");
const fs = require("fs");
const { promisify } = require("util");
const mongoose = require("mongoose");

const fileUnlink = promisify(fs.unlink);

imageRouter.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    const image = await new Image({
      user: {
        _id: req.user.id,
        name: req.user.name,
        username: req.user.username,
      },
      public: req.body.public,
      key: req.file.filename,
      originalName: req.file.originalname,
    }).save();
    res.json(image);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

imageRouter.get("/", async (req, res) => {
  const images = await Image.find({ public: true });
  res.json(images);
});

imageRouter.delete("/:imageId", async (req, res) => {
  // 유저 권한 확인
  // 사진 삭제
  // 1. uploads 폴더에서 사진 삭제
  // 2. DB에서 사진 삭제
  try {
    if (!req.user) throw new Error("권한이 없습니다.");
    if (!mongoose.isValidObjectId(req.params.imageId))
      throw new Error("잘못된 이미지 아이디입니다.");

    const image = await Image.findOneAndDelete({ _id: req.params.imageId });
    if (!image) return res.json({ message: "이미지가 존재하지 않습니다." });

    await fileUnlink(`./uploads/${image.key}`);
    res.json({ message: "이미지가 삭제되었습니다.", image });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});
imageRouter.patch("/:imageid/like", (req, res) => {
  // 유저 권한 확인
  // like 중복 안되도록 확인
});

imageRouter.patch("/:imageid/unlike", (req, res) => {
  // 유저 권한 확인
  // like 중복 취소 안되도록 확인
});

module.exports = { imageRouter };
