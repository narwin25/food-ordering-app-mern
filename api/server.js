import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
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

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connect();
  console.log(`Server is running on http://localhost:${port}`);
});
