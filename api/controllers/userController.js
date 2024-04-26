import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));

    const { password: pass, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) return next(errorHandler(403, "Unauthorized"));

    if (req.body.password)
      req.body.password = bcrypt.hashSync(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    const { password: pass, ...info } = updateUser._doc;
    res.status(200).json(info);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (req.user.id !== id) return next(errorHandler(403, "Unauthorized"));

    await User.findByIdAndDelete(id);
    res.clearCookie("accessToken");
    res.status(204).json({ message: "User has been deleted" });
  } catch (err) {
    next(err);
  }
};
