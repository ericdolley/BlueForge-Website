const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { requireAuth } = require("../middleware/auth");

const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: () => uploadsDir,
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${safeName}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
});

const router = express.Router();

const buildFileMeta = (file) => {
  if (!file) return null;
  const baseUrl = process.env.SERVER_URL
    ? process.env.SERVER_URL.replace(/\/$/, "")
    : "http://localhost:5000";
  return {
    filename: file.filename,
    originalName: file.originalname,
    url: `${baseUrl}/uploads/${file.filename}`,
    uploadedAt: new Date(),
  };
};

const buildFileArray = (filesArray = []) =>
  filesArray.map(buildFileMeta).filter(Boolean);

router.post(
  "/profile",
  requireAuth,
  upload.fields([
    { name: "resumeFile", maxCount: 2 },
    { name: "portfolioFile", maxCount: 2 },
    { name: "projectZip", maxCount: 2 },
  ]),
  async (req, res) => {
    try {
      const user = req.user;
      const { portfolioLinks } = req.body;
      const parsedLinks = [];
      if (portfolioLinks) {
        try {
          const parsed = JSON.parse(portfolioLinks);
          if (Array.isArray(parsed)) {
            parsed.forEach((link) => {
              if (link && typeof link === "string") {
                parsedLinks.push(link.trim());
              }
            });
          }
        } catch {
          portfolioLinks
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .forEach((link) => parsedLinks.push(link));
        }
      }
      if (parsedLinks.length) {
        user.portfolioLinks = Array.from(
          new Set([...user.portfolioLinks, ...parsedLinks])
        );
      }

      const addFiles = (fieldName, storageField) => {
        const incoming = req.files[fieldName];
        if (incoming && incoming.length) {
          user[storageField] = [
            ...user[storageField],
            ...buildFileArray(incoming),
          ];
        }
      };

      addFiles("resumeFile", "resumeFiles");
      addFiles("portfolioFile", "portfolioFiles");
      addFiles("projectZip", "projectFiles");

      await user.save();
      return res.json({ message: "Profile uploaded successfully", user });
    } catch (error) {
      console.error("Upload error", error);
      return res.status(500).json({ message: "Could not upload files" });
    }
  }
);

module.exports = router;
