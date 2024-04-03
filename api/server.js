import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;

// database connection
const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  connect();
  console.log(`Server is running on http://localhost:${port}`);
});
