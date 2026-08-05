import fs from "fs";
import path from "path";

import Company from "../models/company.model.js";
import ApiError from "../errors/ApiError.js";
import DocumentSettings from "../models/documentSettings.model.js";

import QueryFeatures from "../utils/QueryFeatures.js";

import { createAuditLog } from "./auditLog.service.js";
import { USER_POPULATION } from "../constants/populate.js";

/* ========================================================== */
/*                    GET ALL COMPANIES                        */
/* ========================================================== */

export const getCompanies = async (query) => {
  const features = new QueryFeatures(Company, query)
    .search(["companyName", "gstin", "pan", "email", "phone"])
    .filter()
    .withSoftDelete();

  return await features.execute(USER_POPULATION);
};

/* ========================================================== */
/*                    GET COMPANY BY ID                       */
/* ========================================================== */

export const getCompanyById = async (id) => {
  const company = await Company.findOne({
    _id: id,
    isDeleted: false,
  }).populate(USER_POPULATION);

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  return company;
};

////////////////////

export const getCompanyOptions = async () => {
  return await Company.find({
    isActive: true,
    isDeleted: false,
  })
    .select("companyName gstOptions")
    .sort({
      companyName: 1,
    });
};

/* ========================================================== */
/*                    CREATE COMPANY                          */
/* ========================================================== */

export const createCompany = async (data, currentUser) => {
  const company = await Company.create({
    ...data,
    createdBy: currentUser._id,
    updatedBy: currentUser._id,
  });

  await DocumentSettings.create({
    companyId: company._id,
    companyPrefix: "RKI",
    separator: "-",
    financialYear: "26",
    currentSequence: 1,
    documentPrefixes: [
      {
        type: "INVOICE",
        prefix: "I",
      },
      {
        type: "PROFORMA",
        prefix: "P",
      },
      {
        type: "CREDIT_NOTE",
        prefix: "C",
      },
    ],
    resetYearly: true,
    updatedBy: currentUser._id,
  });

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "CREATE",
    entityType: "COMPANY",
    entityId: company._id,
    metadata: {
      companyName: company.companyName,
    },
  });

  return await Company.findById(company._id).populate(USER_POPULATION);
};

/* ========================================================== */
/*                    UPDATE COMPANY                          */
/* ========================================================== */

export const updateCompany = async (id, data, currentUser) => {
  const company = await Company.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const { logoUrl, ...updateData } = data;

  Object.assign(company, updateData);

  company.updatedBy = currentUser._id;

  await company.save();

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

/* ========================================================== */
/*                ACTIVATE / DEACTIVATE                       */
/* ========================================================== */

export const updateCompanyStatus = async (id, isActive, currentUser) => {
  const company = await Company.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  company.isActive = isActive;
  company.updatedBy = currentUser._id;

  await company.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "COMPANY",
    entityId: company._id,
    metadata: {
      companyName: company.companyName,
      isActive,
    },
  });

  return await Company.findById(company._id).populate(USER_POPULATION);
};

/* ========================================================== */
/*                    UPLOAD COMPANY LOGO                     */
/* ========================================================== */

export const uploadCompanyLogo = async (id, file, currentUser) => {
  const company = await Company.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const companyFolder = path.join(
    process.cwd(),
    "uploads",
    "company",
    company._id.toString(),
  );

  company.logoUrl = `/uploads/company/${company._id}/${file.filename}`;
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
