const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");

const connectDB = require("./config/db");
const Resume = require("./models/resume");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.get("/", (req, res) => {
  res.json({
    message: "Backend is working",
  });
});

app.post("/api/resume", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image",
      });
    }

    const newResume = await Resume.create({
      name: req.body.name,
      jobTitle: req.body.jobTitle,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      about: req.body.about,
      education: req.body.education,
      skills: req.body.skills,
      experience: req.body.experience,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Resume created successfully",
      data: newResume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.get("/api/resume", async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });

    res.json(resumes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});