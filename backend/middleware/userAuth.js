
import handleAsyncError from "./handleAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import HandleError from "../utils/handleError.js";

export const verifyUserAuth = handleAsyncError(async (req, res, next) => {

  let token;

  // 1️⃣ Check token from cookies (normal login)
  if (req.cookies?.token) {
    token = req.cookies.token;
  }

  // 2️⃣ Check token from Authorization header (Google login / API requests)
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 3️⃣ If token not found
  if (!token) {
    return next(
      new HandleError(
        "Authentication missing! Please login to access this resource",
        401
      )
    );
  }

  // 4️⃣ Verify token
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // 5️⃣ Find user
  req.user = await User.findById(decodedData.id);

  next();
});

// Role based access control
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {
      return next(
        new HandleError(
          `Role(${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};

