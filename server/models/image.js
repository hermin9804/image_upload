const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    originalName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", ImageSchema);
