import {
  createSacCode,
  getSacCodes,
  getActiveSacCodes,
  updateSacCode,
  deleteSacCode,
} from "../services/sacCode.service.js";

import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

export const create = asyncHandler(async (req, res) => {
  const sacCode = await createSacCode(req.body, req.user._id);

  return res
    .status(201)
    .json(new ApiResponse(201, "SAC Code created successfully", sacCode));
});

export const getAll = asyncHandler(async (req, res) => {
  const result = await getSacCodes(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "SAC Codes fetched successfully", result));
});

export const getDropdown = asyncHandler(async (req, res) => {
  const result = await getActiveSacCodes();

  return res
    .status(200)
    .json(new ApiResponse(200, "SAC Codes fetched successfully", result));
});

export const update = asyncHandler(async (req, res) => {
  const sacCode = await updateSacCode(req.params.id, req.body, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "SAC Code updated successfully", sacCode));
});

export const remove = asyncHandler(async (req, res) => {
  await deleteSacCode(req.params.id, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "SAC Code deleted successfully"));
});
