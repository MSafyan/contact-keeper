const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("auth");
});

router.post("/", (req, res) => {
  res.send("post");
});

module.exports = router;
