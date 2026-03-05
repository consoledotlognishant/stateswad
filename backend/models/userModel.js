
import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
      maxLength: [25, "Name cannot exceed 25 characters"],
      minLength: [3, "Name should contain more than 3 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Please Enter your email"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email"],
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },

    phone: {
      type: String,
      trim: true,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    // Email Verification Link
    emailVerifyToken: String,
    emailVerifyExpire: Date,

    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    // Google OAuth Login
    googleId: {
      type: String,
      sparse: true,
    },

    role: {
      type: String,
      default: "user",
    },

    // Password Reset
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);



// Hash password before saving
userSchema.pre("save", async function (next) {

  if (!this.isModified("password") || !this.password) {
    return next();
  }

  this.password = await bcryptjs.hash(this.password, 10);
  next();
});



// Generate JWT Token
userSchema.methods.getJWTToken = function () {

  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};



// Compare Password
userSchema.methods.verifyPassword = async function (enteredPassword) {

  if (!this.password) return false;

  return await bcryptjs.compare(enteredPassword, this.password);
};



// Generate Email Verification Token
userSchema.methods.generateEmailVerifyToken = function () {

  const token = crypto.randomBytes(20).toString("hex");

  this.emailVerifyToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.emailVerifyExpire = Date.now() + 15 * 60 * 1000;

  return token;
};



// Generate Password Reset Token
userSchema.methods.generatePasswordResetToken = function () {

  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};



export default mongoose.model("User", userSchema);

