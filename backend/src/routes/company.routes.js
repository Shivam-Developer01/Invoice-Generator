import express from "express";

import {
  getAll,
  getById,
  getOptions,
  create,
  update,
  updateStatus,
  uploadLogo,
} from "../controllers/company.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import upload from "../config/multer.js";

import {
  validateCreateCompany,
  validateUpdateCompany,
  validateCompanyStatus,
  validateCompanyId,
} from "../validators/company.validator.js";

import parseFormDataJson from "../middleware/parseFormDataJson.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/options", getOptions);

router
  .route("/")
  .get(getAll)
  .post(upload.single("logo"), parseFormDataJson, validateCreateCompany, validate, create);

router
  .route("/:id")
  .get(validateCompanyId, validate, getById)
  .patch(upload.single("logo"), parseFormDataJson, validateUpdateCompany, validate, update);

router.patch("/:id/status", validateCompanyStatus, validate, updateStatus);

router.post(
  "/:id/logo",
  validateCompanyId,
  validate,
  upload.single("logo"),
  uploadLogo,
);

export default router;
