const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;