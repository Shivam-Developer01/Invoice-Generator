import fs from "fs";
import path from "path";
import sharp from "sharp";

import Company from "../models/company.model.js";
import ApiError from "../errors/ApiError.js";
import DocumentSettings from "../models/documentSettings.model.js";

import QueryFeatures from "../utils/queryFeatures.js";

import { createAuditLog } from "./auditLog.service.js";
import { USER_POPULATION } from "../constants/populate.js";

const processLogoFile = async (file, targetDir) => {
  fs.mkdirSync(targetDir, { recursive: true });

  const ext = path.extname(file.filename).toLowerCase();
  let finalFilename = file.filename;
  const targetPath = path.join(targetDir, finalFilename);

  if (ext === ".webp") {
    finalFilename = file.filename.replace(/\.webp$/i, ".png");
    const pngPath = path.join(targetDir, finalFilename);
    await sharp(file.path).png().toFile(pngPath);
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  } else {
    if (file.path !== targetPath && fs.existsSync(file.path)) {
      fs.renameSync(file.path, targetPath);
    }
  }

  return finalFilename;
};

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

export const createCompany = async (data, file, currentUser) => {
  const company = await Company.create({
    ...data,
    createdBy: currentUser._id,
    updatedBy: currentUser._id,
  });

  if (file) {
    const targetDir = path.join(
      process.cwd(),
      "uploads",
      "company",
      company._id.toString(),
    );

    const filename = await processLogoFile(file, targetDir);

    company.logoUrl = `/uploads/company/${company._id}/${filename}`;
    await company.save();
  }

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

export const updateCompany = async (id, data, file, currentUser) => {
  const company = await Company.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const { logoUrl, ...updateData } = data;

  Object.assign(company, updateData);

  if (file) {
    const targetDir = path.join(
      process.cwd(),
      "uploads",
      "company",
      company._id.toString(),
    );

    const filename = await processLogoFile(file, targetDir);
    company.logoUrl = `/uploads/company/${company._id}/${filename}`;
  }

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

  const targetDir = path.join(
    process.cwd(),
    "uploads",
    "company",
    company._id.toString(),
  );

  const filename = await processLogoFile(file, targetDir);

  company.logoUrl = `/uploads/company/${company._id}/${filename}`;
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
