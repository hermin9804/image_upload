const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Types.ObjectId, required: true },
      name: { type: String, required: true },
      username: { type: String, required: true },
    },
    public: { type: Boolean, required: true, default: false },
    key: { type: String, required: true },
    originalName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", ImageSchema);
