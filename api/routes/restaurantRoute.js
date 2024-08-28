import express from "express";
import { verifyToken } from "../middleware/verifyUser.js";
import {
  createRestaurant,
  getRestaurant,
  searchRestaurant,
  updateRestaurant,
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", verifyToken, getRestaurant);
router.post("/create", verifyToken, createRestaurant);
router.put("/update", verifyToken, updateRestaurant);
router.get("/:id", searchRestaurant);

export default router;
