import AuditLog from "../models/auditLog.model.js";
import QueryFeatures from "../utils/queryFeatures.js";
import ApiError from "../errors/ApiError.js";

const generateDescription = ({ action, entityType, metadata = {} }) => {
  switch (`${action}_${entityType}`) {
    case "CREATE_USER":
      return `Created user ${metadata.name || ""}`;

    case "UPDATE_USER":
      return `Updated user ${metadata.name || ""}`;

    case "CREATE_COMPANY":
      return `Created company ${metadata.companyName || ""}`;

    case "UPDATE_COMPANY":
      return `Updated company ${metadata.companyName || ""}`;

    case "CREATE_CUSTOMER":
      return `Created customer ${metadata.customerName || ""}`;

    case "UPDATE_CUSTOMER":
      return `Updated customer ${metadata.customerName || ""}`;

    case "DELETE_CUSTOMER":
      return `Deleted customer ${metadata.customerName || ""}`;

    case "CREATE_DOCUMENT":
      return `Created ${metadata.documentType || "Document"} ${metadata.documentNumber || ""}`;

    case "UPDATE_DOCUMENT":
      return `Updated ${metadata.documentType || "Document"} ${metadata.documentNumber || ""}`;

    case "DELETE_DOCUMENT":
      return `Deleted ${metadata.documentType || "Document"} ${metadata.documentNumber || ""}`;

    case "UPDATE_DOCUMENT_SETTINGS":
      return "Updated document settings";

    case "LOGIN_USER":
      return "User logged in";

    case "CHANGE_PASSWORD_USER":
      return "Changed password";

    case "REGENERATE_PDF_DOCUMENT":
      return `Regenerated PDF for ${metadata.documentNumber || ""}`;

    default:
      return `${action} ${entityType}`;
  }
};

export const createAuditLog = async ({
  userId,
  userName,
  action,
  entityType,
  entityId,
  metadata = {},
}) => {
  try {
    await AuditLog.create({
      userId,
      userName,
      action,
      entityType,
      entityId,
      description: generateDescription({
        action,
        entityType,
        metadata,
      }),
      metadata,
    });
  } catch (error) {
    console.error("Audit Log Error:", error.message);
  }
};

export const getAuditLogs = async (query) => {
  const features = new QueryFeatures(AuditLog, query)
    .search(["userName", "description", "action", "entityType"])
    .filter();

  return await features.execute();
};

export const getAuditLogById = async (id) => {
  const auditLog = await AuditLog.findById(id);

  if (!auditLog) {
    throw new ApiError(404, "Audit log not found");
  }

  return auditLog;
};
