import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  campaign: { type: String, required: true, default: "Mahashivratri" },
  tagline: { type: String, default: "Donate with us and feed souls for one day" },
  amount: { type: Number, required: true, min: 1 },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  email: { type: String },
  name: { type: String },
  message: { type: String },
  paymentInfo: {
    id: { type: String },
    status: { type: String },
  },
  paidAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Donation", donationSchema);
