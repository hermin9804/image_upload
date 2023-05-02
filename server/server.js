const express = require("express");

const app = express();
const PORT = 5001;

app.post("/upload", (req, res) => {
  console.log("/upload called!!");
  res.json({ result: "success" });
});

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
