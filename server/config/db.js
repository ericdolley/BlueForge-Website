const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("DB: Checking for MONGO_URI...");

    // Get ONLY from environment - NO HARDCODED FALLBACK
    const mongoUri = process.env.MONGO_URI;

    console.log("DB: MONGO_URI found?", !!mongoUri);

    if (!mongoUri) {
      console.error("DB ERROR: MONGO_URI is undefined");
      throw new Error("MONGO_URI is not defined in environment");
    }

    console.log("DB: Attempting to connect to MongoDB...");

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB: MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("DB: MongoDB connection error:", error.message);
    throw error;
  }
};

module.exports = connectDB;
