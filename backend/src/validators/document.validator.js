import { body, param } from "express-validator";

export const validateCreateDocument = [
  body("documentType")
    .trim()
    .toUpperCase()
    .isIn(["INVOICE", "PROFORMA", "CREDIT_NOTE"])
    .withMessage("Invalid document type"),

  body("customerId")
    .notEmpty()
    .withMessage("Customer is required")
    .isMongoId()
    .withMessage("Invalid customer id"),

  body("documentDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid document date")
    .toDate(),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid due date")
    .toDate(),

  body("items")
    .isArray({ min: 1 })
    .withMessage("At least one item is required"),

  body("items.*.description")
    .trim()
    .notEmpty()
    .withMessage("Item description is required")
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters")
    .escape(),

  body("items.*.hsnSacCode")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Invalid HSN/SAC Code")
    .escape(),

  body("items.*.amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be greater than or equal to 0"),

  body("taxes").optional().isArray().withMessage("Taxes must be an array"),

  body("taxes.*.name")
    .optional()
    .trim()
    .toUpperCase()
    .isIn(["CGST", "SGST", "IGST", "UTGST", "CESS"])
    .withMessage("Invalid tax name"),

  body("taxes.*.percentage")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid tax percentage"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters")
    .escape(),
];

export const validateUpdateDocument = [
  param("id")
    .isMongoId()
    .withMessage("Invalid document id"),

  body("documentType")
    .optional()
    .trim()
    .toUpperCase()
    .isIn(["INVOICE", "PROFORMA", "CREDIT_NOTE"])
    .withMessage("Invalid document type"),

  body("customerId")
    .optional()
    .isMongoId()
    .withMessage("Invalid customer id"),

  body("documentDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid document date"),

  body("dueDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid due date"),

  body("items")
    .optional()
    .isArray({ min: 1 })
    .withMessage("At least one item is required"),

  body("items.*.description")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Item description is required"),

  body("items.*.hsnSacCode")
    .optional()
    .trim(),

  body("items.*.amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount must be greater than or equal to 0"),

  body("taxes")
    .optional()
    .isArray()
    .withMessage("Taxes must be an array"),

  body("taxes.*.name")
    .optional()
    .trim()
    .toUpperCase()
    .isIn(["CGST", "SGST", "IGST", "UTGST", "CESS"])
    .withMessage("Invalid tax name"),

  body("taxes.*.percentage")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Invalid tax percentage"),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters")
    .escape(),
];

export const validateDocumentId = [
  param("id").isMongoId().withMessage("Invalid document id"),
];

export const validateDeleteDocument = [
  param("id").isMongoId().withMessage("Invalid document id"),
];
