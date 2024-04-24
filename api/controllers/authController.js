import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const { password: pass, ...info } = user._doc;

    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(info);
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("accessToken")
      .status(200)
      .json({ message: "User logged out successfully" });
  } catch (err) {
    next(err);
  }
};
