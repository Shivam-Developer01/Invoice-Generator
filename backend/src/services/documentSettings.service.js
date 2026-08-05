import DocumentSettings from "../models/documentSettings.model.js";
import { createAuditLog } from "./auditLog.service.js";
import ApiError from "../errors/ApiError.js";
import Company from "../models/company.model.js";

export const getSettings = async (companyId) => {
  const company = await Company.findOne({
    _id: companyId,
    isDeleted: false,
  });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }
  const settings = await DocumentSettings.findOne({
    companyId,
  }).populate("updatedBy", "name email role");

  if (!settings) {
    throw new ApiError(404, "Document settings not found");
  }

  return settings;
};

export const updateSettings = async (companyId, data, currentUser) => {
  const company = await Company.findOne({
    _id: companyId,
    isDeleted: false,
  });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }
  let settings = await DocumentSettings.findOne({
    companyId,
  });

  if (!settings) {
    throw new ApiError(404, "Document settings not found");
  } else {
    const {
      companyPrefix,
      separator,
      financialYear,
      documentPrefixes,
      resetYearly,
    } = data;

    if (companyPrefix !== undefined) settings.companyPrefix = companyPrefix;

    if (separator !== undefined) settings.separator = separator;

    if (financialYear !== undefined) settings.financialYear = financialYear;

    if (documentPrefixes !== undefined)
      settings.documentPrefixes = documentPrefixes;

    if (resetYearly !== undefined) settings.resetYearly = resetYearly;

    settings.updatedBy = currentUser._id;

    await settings.save();
  }

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "DOCUMENT_SETTINGS",
    entityId: settings._id,
    metadata: {
      companyName: company.companyName,
      companyPrefix: settings.companyPrefix,
      financialYear: settings.financialYear,
      separator: settings.separator,
      resetYearly: settings.resetYearly,
    },
  });

  return await DocumentSettings.findById(settings._id).populate(
    "updatedBy",
    "name email role",
  );
};
