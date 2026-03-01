import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, required: true },
  product: { type: mongoose.Schema.ObjectId, ref: "Product", required: true },
  withGhee: { type: Boolean, default: true },
  sugarType: { type: String, enum: ["jaggery", "sugar"], default: "jaggery" },
  isGift: { type: Boolean, default: false },
  messageToSeller: { type: String, default: "" },
  customNote: { type: String, default: "" },
  isDonation: { type: Boolean, default: false },
});

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: Number, required: true },
    phoneNo: { type: String, required: true },
  },
  orderItems: [orderItemSchema],
  orderStatus: { type: String, required: true, default: "Processing" },
  paymentMethod: { type: String, enum: ["cod", "razorpay", "upi"], default: "razorpay" },
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: { type: Date },
  itemPrice: { type: Number, required: true, default: 0 },
  taxPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  discountAmount: { type: Number, default: 0 },
  couponCode: { type: String },
  totalPrice: { type: Number, required: true, default: 0 },
  trackingId: { type: String },
  giftPackaging: { type: String, default: "standard" },
  deliveredAt: Date,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
