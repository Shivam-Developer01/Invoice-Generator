import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

import {
  getSettings,
  updateSettings,
} from "../services/documentSettings.service.js";

export const get = asyncHandler(async (req, res) => {
  const settings = await getSettings();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        settings
          ? "Settings fetched successfully"
          : "Settings not configured yet",
        settings,
      ),
    );
});

export const update = asyncHandler(async (req, res) => {
  const settings = await updateSettings(req.body, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings updated successfully", settings));
});
