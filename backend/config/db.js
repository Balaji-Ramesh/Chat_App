const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const DB_URL = process.env.DB_URL;
console.log(DB_URL);

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error, "MongoDB failed to connect");
    process.exit(1);
  }
};

module.exports = connectDB;
