import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

import fs from "fs";
import path from "path";

import ApiError from "../errors/ApiError.js";

import {
  getCompany,
  updateCompany,
  uploadCompanyLogo,
} from "../services/company.service.js";

export const update = asyncHandler(async (req, res) => {

  const company = await updateCompany(req.body, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Company updated successfully", company));
});

export const uploadLogo = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload a logo image.");
  }

  const company = await uploadCompanyLogo(req.file, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Company logo updated successfully.", company));
});

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
