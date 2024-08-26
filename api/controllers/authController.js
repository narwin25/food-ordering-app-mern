import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const user = await User.findOne({ username, email });
    if (user) return next(errorHandler(400, "User already exists"));

    const hash = bcryptjs.hashSync(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    const { password: pass, ...info } = validUser._doc;

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
