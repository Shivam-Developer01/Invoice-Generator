import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

import {
  getAuditLogs,
  getAuditLogById,
} from "../services/auditLog.service.js";

export const getAll = asyncHandler(async (req, res) => {
  const logs = await getAuditLogs(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Audit logs fetched successfully",
      logs
    )
  );
});

export const getOne = asyncHandler(async (req, res) => {
  const log = await getAuditLogById(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Audit log fetched successfully",
      log
    )
  );
});