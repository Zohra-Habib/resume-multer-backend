const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
  try {
    const {
      name,
      jobTitle,
      email,
      phone,
      location,
      about,
      education,
      skills,
      experience,
    } = req.body;

    if (
      !name ||
      !jobTitle ||
      !email ||
      !phone ||
      !location ||
      !about ||
      !education ||
      !skills
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a profile image",
      });
    }

    const resume = await Resume.create({
      name,
      jobTitle,
      email,
      phone,
      location,
      about,
      education,
      skills,
      experience,
      image: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Resume created successfully",
      data: resume,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    res.status(200).json({
      data: resume,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
  getResume,
};