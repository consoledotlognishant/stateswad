import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image: { type: String },
  withGhee: { type: Boolean, default: true },
  sugarType: { type: String, enum: ["jaggery", "sugar"], default: "jaggery" },
  isGift: { type: Boolean, default: false },
  messageToSeller: { type: String, default: "" },
  customNote: { type: String, default: "" },
  isDonation: { type: Boolean, default: false },
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true, unique: true },
  items: [cartItemSchema],
  updatedAt: { type: Date, default: Date.now },
});

cartSchema.index({ user: 1 });

export default mongoose.model("Cart", cartSchema);
