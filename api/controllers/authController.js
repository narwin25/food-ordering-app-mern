import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return next(errorHandler(400, "User already exists"));

    const hash = bcrypt.hashSync(password, 10);
    const newUser = new User({ email, password: hash });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(errorHandler(401, "Invalid credentials"));

    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "User logged out successfully" });
};
