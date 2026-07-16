import express from "express";

import {
  create,
  getAll,
  getDropdown,
  update,
  remove,
} from "../controllers/sacCode.controller.js";

import {
  validateCreateSacCode,
  validateUpdateSacCode,
  validateSacCodeId,
} from "../validators/sacCode.validator.js";

import validate from "../middleware/validate.middleware.js";
import {protect} from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/dropdown", getDropdown);

router.route("/").get(getAll).post(validateCreateSacCode, validate, create);

router
  .route("/:id")
  .patch(validateUpdateSacCode, validate, update)
  .delete(validateSacCodeId, validate, remove);

export default router;
