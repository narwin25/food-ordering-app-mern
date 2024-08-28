import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId(),
  },
  menuName: { type: String, required: true },
  price: { type: Number, required: true },
});

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  restaurantName: { type: String, required: true },
  location: { type: String, required: true },
  menus: [menuSchema],
  // images: { type: String, required: true },
  lastUpdated: { type: Date, required: true },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
