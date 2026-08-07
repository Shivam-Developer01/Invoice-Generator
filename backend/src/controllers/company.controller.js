import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";
import ApiError from "../errors/ApiError.js";

import {
  getCompanies,
  getCompanyById,
  getCompanyOptions,
  createCompany,
  updateCompany,
  updateCompanyStatus,
  uploadCompanyLogo,
} from "../services/company.service.js";

/* ========================================================== */
/*                    GET ALL COMPANIES                       */
/* ========================================================== */

export const getAll = asyncHandler(async (req, res) => {
  const companies = await getCompanies(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Companies fetched successfully", companies));
});

/* ========================================================== */
/*                    GET COMPANY BY ID                       */
/* ========================================================== */

export const getById = asyncHandler(async (req, res) => {
  const company = await getCompanyById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Company fetched successfully", company));
});

//////////////////////

export const getOptions = asyncHandler(async (req, res) => {
  const companies = await getCompanyOptions();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Company options fetched successfully", companies),
    );
});

/* ========================================================== */
/*                    CREATE COMPANY                          */
/* ========================================================== */

export const create = asyncHandler(async (req, res) => {
  const company = await createCompany(req.body, req.file, req.user);

  return res
    .status(201)
    .json(new ApiResponse(201, "Company created successfully", company));
});

/* ========================================================== */
/*                    UPDATE COMPANY                          */
/* ========================================================== */

export const update = asyncHandler(async (req, res) => {
  const company = await updateCompany(req.params.id, req.body, req.file, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Company updated successfully", company));
});

/* ========================================================== */
/*               ACTIVATE / DEACTIVATE                        */
/* ========================================================== */

export const updateStatus = asyncHandler(async (req, res) => {
  const company = await updateCompanyStatus(
    req.params.id,
    req.body.isActive,
    req.user,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        `Company ${
          req.body.isActive ? "activated" : "deactivated"
        } successfully`,
        company,
      ),
    );
});

/* ========================================================== */
/*                  UPLOAD COMPANY LOGO                       */
/* ========================================================== */

export const uploadLogo = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please upload a logo image.");
  }

  const company = await uploadCompanyLogo(req.params.id, req.file, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Company logo updated successfully", company));
});
