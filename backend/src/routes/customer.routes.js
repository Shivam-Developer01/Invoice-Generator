import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  updateStatus,
} from "../controllers/customer.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  validateCreateCustomer,
  validateUpdateCustomer,
  validateCustomerStatus,
  validateCustomerId,
} from "../validators/customer.validator.js";

const router = express.Router();

router.use(protect);

/* ---------- Static Routes ---------- */

router.get("/", getAll);

router.post(
  "/",
  validateCreateCustomer,
  validate,
  create
);

/* ---------- Dynamic Routes ---------- */

router.get(
  "/:id",
  validateCustomerId,
  validate,
  getOne
);

router.patch(
  "/:id",
  validateUpdateCustomer,
  validate,
  update
);

router.patch(
  "/:id/status",
  validateCustomerStatus,
  validate,
  updateStatus
);

export default router;