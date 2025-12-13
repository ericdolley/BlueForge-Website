require("dotenv").config();

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const connectDB = require("./config/db");
const Advertisement = require("./models/Advertisement");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const uploadRoutes = require("./routes/uploads");
const adminRoutes = require("./routes/admin");
const adsRoutes = require("./routes/ads");

dotenv.config();

const app = express();

// const start = async () => {
//   try {
//     await connectDB();

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Startup error", error.message);
//     process.exit(1);
//   }
// };

// start();

const allowedOrigins = (process.env.FRONTEND_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        allowedOrigins.includes("*")
      ) {
        return callback(null, true);
      }
      return callback(new Error("CORS origin denied"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use("/uploads", express.static(uploadDir));

app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/ads", adsRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/status", (req, res) => {
  return res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error", err);
  return res.status(500).json({ message: "Internal server error" });
});

const seedAds = async () => {
  const count = await Advertisement.countDocuments();
  if (count > 0) {
    return;
  }
  await Advertisement.create([
    {
      title: "Build Digital Homes That Convert",
      description:
        "From concept to launch, we craft immersive experiences for bold founders.",
      cta: "See success stories",
      tagline: "Growth-first approach",
      imageUrl:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80",
      active: true,
    },
    {
      title: "Design Systems That Scale",
      description:
        "Crafted responsive UI, thoughtful interactions, and a design language ready for teams.",
      cta: "Review our systems",
      tagline: "Design + engineering",
      imageUrl:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
      active: true,
    },
    {
      title: "Future-Proofed Tech Stack",
      description:
        "MERN-based architecture with automated pipelines for rapid iterations.",
      cta: "Meet the team",
      tagline: "Reliable delivery",
      imageUrl:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=900&q=80",
      active: true,
    },
  ]);
};

const start = async () => {
  await connectDB();
  await seedAds();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start().catch((error) => {
  console.error("Startup error", error);
  process.exit(1);
});
