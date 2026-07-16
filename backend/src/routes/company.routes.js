import express from "express";

import {
  get,
  update,
} from "../controllers/company.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  validateUpdateCompany,
} from "../validators/company.validator.js";

const router = express.Router();

router.use(protect);

router.get("/", get);

router.patch(
  "/",
  validateUpdateCompany,
  validate,
  update
);

export default router;