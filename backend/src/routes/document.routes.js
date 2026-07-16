import express from "express";

import {
  create,
  getAll,
  getOne,
  update,
  remove,
} from "../controllers/document.controller.js";
import { download } from "../controllers/document.controller.js";
import { regenerate } from "../controllers/document.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {
  validateCreateDocument,
  validateUpdateDocument,
  validateDocumentId,
  validateDeleteDocument,
} from "../validators/document.validator.js";

const router = express.Router();

router.use(protect);

router.route("/").post(validateCreateDocument, validate, create).get(getAll);

router.get("/:id/pdf", validateDocumentId, validate, download);
router.post("/:id/regenerate-pdf", validateDocumentId, validate, regenerate);

router
  .route("/:id")
  .get(validateDocumentId, validate, getOne)
  .patch(validateUpdateDocument, validate, update)
  .delete(validateDeleteDocument, validate, remove);

export default router;
