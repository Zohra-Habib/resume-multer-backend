const express = require("express");
const upload = require("../middleware/upload");

const {
  uploadResume,
  getResume,
} = require("../controllers/resumeController");

const router = express.Router();

router.post("/", upload.single("image"), uploadResume);

router.get("/", getResume);

module.exports = router;