import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
export const isPatientAunthentication = catchAsyncErrors(async (req, res, next) => {
  const { patientToken } = req.cookies;
  console.log("patientToken:", patientToken); // 🟡 log

  if (!patientToken) {
    return next(new ErrorHandler("Please login as Patient", 401));
  }

  const decoded = jwt.verify(patientToken, process.env.JWT_SECRET_KEY);
  console.log("Decoded Patient ID:", decoded.id); // 🟡 log

  const user = await User.findById(decoded.id);
  console.log("User from DB:", user); // 🟡 log

  if (!user) {
    return next(new ErrorHandler("User is not defined", 404));
  }

  req.user = user;
  next();
});

export const isAdminAunthentication = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;

  if (!adminToken) {
    return next(new ErrorHandler("Please login as Admin", 401));
  }

  const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(new ErrorHandler("User is not defined", 404));
  }

  req.user = user;
  next();
});