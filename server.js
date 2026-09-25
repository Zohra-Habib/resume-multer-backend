const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/uploads", express.static(uploadDir));

app.get("/", (req, res) => {
  res.json({
    message: "Resume Backend is working",
  });
});

app.use("/api/resume", resumeRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});