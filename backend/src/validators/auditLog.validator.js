import { param } from "express-validator";

export const validateAuditLogId = [
  param("id")
    .isMongoId()
    .withMessage("Invalid audit log id"),
];