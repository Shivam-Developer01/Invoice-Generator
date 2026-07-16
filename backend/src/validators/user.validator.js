import { body, param } from "express-validator";

export const validateCreateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .escape(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character",
    ),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .customSanitizer((value) => value.toUpperCase().replace(/[-\s]/g, "_"))
    .toUpperCase()
    .isIn(["CEO", "CO_FOUNDER", "MANAGER", "ACCOUNTANT", "OTHERS"])
    .withMessage("Invalid role"),
];

export const validateUpdateUser = [
  param("id").isMongoId().withMessage("Invalid user id"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .escape(),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("role")
    .optional()
    .isIn(["CO_FOUNDER", "MANAGER", "ACCOUNTANT", "OTHERS"])
    .withMessage("Invalid role"),
];

export const validateUserStatus = [
  param("id").isMongoId().withMessage("Invalid user id"),

  body("isActive").isBoolean().withMessage("isActive must be true or false"),
];

export const validateUserId = [
  param("id").isMongoId().withMessage("Invalid user id"),
];

export const validateChangePassword = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must contain uppercase, lowercase, number and special character",
    ),
];
