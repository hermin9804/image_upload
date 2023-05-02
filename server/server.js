const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const app = express();
const PORT = 5001;

app.post("/upload", upload.single("imageTest"), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
