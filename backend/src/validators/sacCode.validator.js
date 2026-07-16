import { body, param } from "express-validator";

export const validateCreateSacCode = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("SAC code is required")
    .isLength({ max: 20 })
    .withMessage("SAC code cannot exceed 20 characters")
    .toUpperCase(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

export const validateUpdateSacCode = [
  param("id").isMongoId().withMessage("Invalid SAC Code ID"),

  body("code")
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage("SAC code cannot exceed 20 characters")
    .toUpperCase(),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Description cannot exceed 255 characters"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be true or false"),
];

export const validateSacCodeId = [
  param("id").isMongoId().withMessage("Invalid SAC Code ID"),
];
