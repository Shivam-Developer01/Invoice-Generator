import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

import ApiError from "../errors/ApiError.js";

import asyncHandler from "./async.middleware.js";

import { env } from "../config/env.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Authentication token missing");
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account has been deactivated");
  }

  req.user = user;

  next();
});
