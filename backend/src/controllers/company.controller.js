import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

import { getCompany, updateCompany } from "../services/company.service.js";

export const get = asyncHandler(async (req, res) => {
  const company = await getCompany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        company ? "Company fetched successfully" : "Company not configured yet",
        company,
      ),
    );
});

export const update = asyncHandler(async (req, res) => {
  const company = await updateCompany(req.body, req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Company updated successfully", company));
});