import User from "../models/user.model.js";
import ApiError from "../errors/ApiError.js";
import generateToken from "../utils/jwt/generateToken.js";
import { createAuditLog } from "./auditLog.service.js";

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account has been deactivated");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken(user._id);

  await createAuditLog({
    userId: user._id,
    userName: user.name,
    action: "LOGIN",
    entityType: "USER",
    entityId: user._id,
    metadata: {
      email: user.email,
      role: user.role,
    },
  });

  user.password = undefined;

  return {
    user,
    token,
  };
};
