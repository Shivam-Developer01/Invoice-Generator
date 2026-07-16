import { body } from "express-validator";

export const validateUpdateCompany = [
  body("companyName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("website")
    .optional()
    .isURL()
    .withMessage("Invalid website URL"),

  body("phone")
    .optional()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),
];