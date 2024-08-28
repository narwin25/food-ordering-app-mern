import mongoose from "mongoose";
import Restaurant from "../models/restaurantModel.js";
import { errorHandler } from "../utils/error.js";

export const getRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.user._id });
    if (!restaurant) return next(errorHandler(404, "Restaurant not found!"));
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.user._id });
    if (restaurant)
      return next(errorHandler(409, "Restaurant already exists!"));

    const newRestaurant = new Restaurant(req.body);
    newRestaurant.user = new mongoose.ObjectId(req.user._id);
    newRestaurant.lastUpdated = new Date();
    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    next(error);
  }
};

export const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.user._id });
    if (!restaurant) return next(errorHandler(404, "Restaurant not found!"));

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.location = req.body.location;
    restaurant.menus = req.body.menus;
    restaurant.lastUpdated = new Date();
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
};

export const searchRestaurant = async (req, res, next) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return next(errorHandler(404, "Restaurant not found!"));

    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};
