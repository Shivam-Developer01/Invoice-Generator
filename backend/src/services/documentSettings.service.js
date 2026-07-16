import DocumentSettings from "../models/documentSettings.model.js";
import { createAuditLog } from "./auditLog.service.js";

export const getSettings = async () => {
  return await DocumentSettings.findOne().populate(
    "updatedBy",
    "name email role",
  );
};

export const updateSettings = async (data, currentUser) => {
  let settings = await DocumentSettings.findOne();

  if (!settings) {
    settings = await DocumentSettings.create({
      ...data,
      updatedBy: currentUser._id,
    });
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
