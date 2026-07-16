import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserStatus,
  changePassword,
} from "../services/user.service.js";

export const create = asyncHandler(async (req, res) => {
  const user = await createUser(req.body, req.user);

  return res
    .status(201)
    .json(new ApiResponse(201, "User created successfully", user));
});

export const getAll = asyncHandler(async (req, res) => {
  const users = await getAllUsers();

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

export const getOne = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", user));
});

export const update = asyncHandler(async (req, res) => {
  const user = await updateUser(req.params.id, req.body, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "User updated successfully", user));
});

export const updateStatus = asyncHandler(async (req, res) => {
  const user = await updateUserStatus(
    req.params.id,
    req.body.isActive,
    req.user,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "User status updated successfully", user));
});

export const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await changePassword(req.user._id, currentPassword, newPassword);

  return res
    .status(200)
    .json(new ApiResponse(200, "Password updated successfully"));
});
