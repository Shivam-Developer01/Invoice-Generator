import express from "express";

import {
  get,
  update,
} from "../controllers/documentSettings.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { validateUpdateSettings } from "../validators/documentSettings.validator.js";

const router = express.Router();

router.use(protect);

router.get("/", get);

router.patch(
  "/",
  validateUpdateSettings,
  validate,
  update
);

export default router;