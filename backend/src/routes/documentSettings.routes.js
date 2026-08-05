import express from "express";

import { get, update } from "../controllers/documentSettings.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { validateUpdateSettings } from "../validators/documentSettings.validator.js";
import { validateCompanyId } from "../validators/company.validator.js";

const router = express.Router();

router.use(protect);

router.get("/:id", validateCompanyId, validate, get);

router.patch(
  "/:id",
  validateCompanyId,
  validateUpdateSettings,
  validate,
  update,
);

export default router;
