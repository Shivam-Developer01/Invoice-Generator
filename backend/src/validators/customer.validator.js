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

export const validateCreateCustomer = [
  body("customerName")
    .trim()
    .notEmpty()
    .withMessage("Customer name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Customer name must be between 2 and 100 characters")
    .escape(),

  body("contactPerson")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Contact person must not exceed 100 characters")
    .escape(),

  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  body("gstin")
    .optional({ values: "falsy" })
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

  ...addressValidation("billingAddress"),

  ...addressValidation("shippingAddress"),
];

export const validateUpdateCustomer = [
  param("id").isMongoId().withMessage("Invalid customer id"),

  body("customerName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Customer name must be between 2 and 100 characters")
    .escape(),

  body("contactPerson")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Contact person must not exceed 100 characters")
    .escape(),

  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number"),

  body("gstin")
    .optional({ values: "falsy" })
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

  ...addressValidation("billingAddress"),

  ...addressValidation("shippingAddress"),
];

export const validateCustomerStatus = [
  param("id").isMongoId().withMessage("Invalid customer id"),

  body("isActive").isBoolean().withMessage("isActive must be true or false"),
];

export const validateCustomerId = [
  param("id").isMongoId().withMessage("Invalid customer id"),
];
