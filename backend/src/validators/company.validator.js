import { body, param } from "express-validator";

const addressValidation = (field) => [
  body(`${field}.addressLine1`)
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage(`${field}.addressLine1 must not exceed 255 characters`),

  body(`${field}.addressLine2`)
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage(`${field}.addressLine2 must not exceed 255 characters`),

  body(`${field}.city`)
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(`${field}.city must not exceed 100 characters`)
    .escape(),

  body(`${field}.state`)
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(`${field}.state must not exceed 100 characters`)
    .escape(),

  body(`${field}.country`)
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(`${field}.country must not exceed 100 characters`)
    .escape(),

  body(`${field}.pincode`)
    .optional()
    .trim()
    .isPostalCode("IN")
    .withMessage("Invalid pincode"),
];

const bankValidation = [
  body("bankDetails.bankName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Bank name must not exceed 100 characters"),

  body("bankDetails.accountName")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Account name must not exceed 100 characters"),

  body("bankDetails.accountNumber")
    .optional()
    .trim()
    .isLength({ max: 30 })
    .withMessage("Invalid account number"),

  body("bankDetails.ifscCode")
    .optional()
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Invalid IFSC code"),

  body("bankDetails.branch")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Branch name must not exceed 100 characters"),

  body("bankDetails.upiId")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("UPI ID must not exceed 100 characters"),
];

/* ========================================================== */
/*                    CREATE COMPANY                          */
/* ========================================================== */

export const validateCreateCompany = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Company name must be between 2 and 150 characters")
    .escape(),

  body("gstin")
    .optional()
    .trim()
    .toUpperCase()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/)
    .withMessage("Invalid GSTIN"),

  body("pan")
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN"),

  body("email").optional().trim().isEmail().withMessage("Invalid email").normalizeEmail(),

  body("phone")
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  body("website").optional({ values: "falsy" }).trim().isURL().withMessage("Invalid website URL"),

  ...addressValidation("addresses.registeredOffice"),

  ...addressValidation("addresses.corporateOffice"),

  ...bankValidation,
];

/* ========================================================== */
/*                    UPDATE COMPANY                          */
/* ========================================================== */

export const validateUpdateCompany = [
  param("id").isMongoId().withMessage("Invalid company id"),

  body("companyName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 150 })
    .withMessage("Company name must be between 2 and 150 characters")
    .escape(),

  body("gstin")
    .optional()
    .trim()
    .toUpperCase()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/)
    .withMessage("Invalid GSTIN"),

  body("pan")
    .optional()
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  body("website").optional({ values: "falsy" }).trim().isURL().withMessage("Invalid website URL"),

  ...addressValidation("addresses.registeredOffice"),

  ...addressValidation("addresses.corporateOffice"),

  ...bankValidation,
];

/* ========================================================== */
/*                  UPDATE STATUS                             */
/* ========================================================== */

export const validateCompanyStatus = [
  param("id").isMongoId().withMessage("Invalid company id"),

  body("isActive").isBoolean().withMessage("isActive must be true or false"),
];

/* ========================================================== */
/*                    COMPANY ID                              */
/* ========================================================== */

export const validateCompanyId = [
  param("id").isMongoId().withMessage("Invalid company id"),
];
