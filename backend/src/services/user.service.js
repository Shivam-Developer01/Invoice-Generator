import User from "../models/user.model.js";
import ApiError from "../errors/ApiError.js";
import { createAuditLog } from "./auditLog.service.js";

export const createUser = async (
  { name, email, password, role },
  currentUser,
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "CREATE",
    entityType: "USER",
    entityId: user._id,
    metadata: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

export const getUserById = async (id) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};

export const updateUser = async (id, data, currentUser) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  Object.assign(user, data);

  await user.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "USER",
    entityId: user._id,
    metadata: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  return user;
};

export const updateUserStatus = async (id, isActive, currentUser) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isActive = isActive;

  await user.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "USER",
    entityId: user._id,
    metadata: {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.isActive ? "Activated" : "Deactivated",
    },
  });

  return user;
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }

  user.password = newPassword;

  await user.save();

  await createAuditLog({
    userId: user._id,
    userName: user.name,
    action: "CHANGE_PASSWORD",
    entityType: "USER",
    entityId: user._id,
    metadata: {
      email: user.email,
      role: user.role,
    },
  });

  return null;
};
