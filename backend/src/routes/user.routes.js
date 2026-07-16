import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  updateStatus,
  updatePassword,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  validateCreateUser,
  validateUpdateUser,
  validateUserStatus,
  validateUserId,
  validateChangePassword,
} from "../validators/user.validator.js";

const router = express.Router();

// Protect all routes
router.use(protect);

/* ------------------------- Static Routes ------------------------- */

// GET All Users
router.get("/", getAll);

// Create User
router.post("/", validateCreateUser, validate, create);

// Change Logged-in User Password
router.patch(
  "/change-password",
  validateChangePassword,
  validate,
  updatePassword,
);

/* ------------------------- Dynamic Routes ------------------------- */

// Get User by Id
router.get("/:id", validateUserId, validate, getOne);

// Update User
router.patch("/:id", validateUpdateUser, validate, update);

// Activate / Deactivate User
router.patch("/:id/status", validateUserStatus, validate, updateStatus);

export default router;
