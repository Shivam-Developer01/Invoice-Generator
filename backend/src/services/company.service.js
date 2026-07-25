import Company from "../models/company.model.js";
import { createAuditLog } from "./auditLog.service.js";
import { USER_POPULATION } from "../constants/populate.js";
import fs from "fs";
import path from "path";

export const getCompany = async () => {
  return await Company.findOne()
    .populate("createdBy", "name email role")
    .populate("updatedBy", "name email role");
};

export const updateCompany = async (data, currentUser) => {
  let company = await Company.findOne();

  if (!company) {
    company = await Company.create({
      ...data,
      createdBy: currentUser._id,
      updatedBy: currentUser._id,
    });
  } else {
    Object.assign(company, data);

    company.updatedBy = currentUser._id;

    await company.save();
  }

  console.log("Creating company audit log...");

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "COMPANY",
    entityId: company._id,
    metadata: {
      companyName: company.companyName,
    },
  });

  return await Company.findById(company._id).populate(USER_POPULATION);
};

export const uploadCompanyLogo = async (file, currentUser) => {
  const company = await Company.findOne();

  if (!company) {
    throw new ApiError(
      404,
      "Please configure company details before uploading a logo."
    );
  }

  // Delete old logo if it exists
  if (company.logoUrl) {
    const oldLogoPath = path.resolve(company.logoUrl);

    if (fs.existsSync(oldLogoPath)) {
      fs.unlinkSync(oldLogoPath);
    }
  }

  company.logoUrl = `/uploads/company/logos/${file.filename}`;
  company.updatedBy = currentUser._id;

  await company.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "COMPANY",
    entityId: company._id,
    metadata: {
      field: "logo",
    },
  });

  return await Company.findById(company._id).populate(USER_POPULATION);
};