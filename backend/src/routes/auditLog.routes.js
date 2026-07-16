import express from "express";

import {
  getAll,
  getOne,
} from "../controllers/auditLog.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  validateAuditLogId,
} from "../validators/auditLog.validator.js";

const router = express.Router();

router.use(protect);

router.get("/", getAll);

router.get(
  "/:id",
  validateAuditLogId,
  validate,
  getOne
);

export default router;