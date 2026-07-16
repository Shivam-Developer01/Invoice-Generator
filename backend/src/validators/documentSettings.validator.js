import { body } from "express-validator";

export const validateUpdateSettings = [
  body("companyPrefix")
    .optional()
    .trim()
    .toUpperCase()
    .notEmpty()
    .withMessage("Company prefix is required"),

  body("separator")
    .optional()
    .trim()
    .isLength({ min: 1, max: 3 })
    .withMessage("Separator must be between 1 and 3 characters"),

  body("financialYear")
    .optional()
    .trim()
    .isLength({ min: 2, max: 4 })
    .withMessage("Invalid financial year"),

  body("resetYearly")
    .optional()
    .isBoolean()
    .withMessage("resetYearly must be boolean"),

  body("documentPrefixes")
    .optional()
    .isArray()
    .withMessage("documentPrefixes must be an array"),

  body("documentPrefixes.*.type")
    .optional()
    .isIn(["INVOICE", "PROFORMA", "CREDIT_NOTE"])
    .withMessage("Invalid document type"),

  body("documentPrefixes.*.prefix")
    .optional()
    .trim()
    .toUpperCase()
    .isLength({ min: 1, max: 5 })
    .withMessage("Invalid document prefix"),
];
