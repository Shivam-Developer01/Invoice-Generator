import fs from "fs";
import path from "path";

import Customer from "../models/customer.model.js";
import Document from "../models/document.model.js";
import Company from "../models/company.model.js";

import ApiError from "../errors/ApiError.js";

import QueryFeatures from "../utils/queryFeatures.js";
import generateDocumentNumber from "../utils/generateDocumentNumber.js";
import generatePdf from "../utils/generatePdf.js";

import { USER_POPULATION } from "../constants/populate.js";
import { createAuditLog } from "./auditLog.service.js";

const getDocumentAuditMetadata = (document) => ({
  documentNumber: document.documentNumber,
  documentType: document.documentType,
  customerName: document.customerSnapshot.customerName,
  totalAmount: document.totalAmount,
});

const createCustomerSnapshot = (customer) => ({
  customerName: customer.customerName,
  contactPerson: customer.contactPerson,
  email: customer.email,
  phone: customer.phone,
  gstin: customer.gstin,
  pan: customer.pan,
  billingAddress: customer.billingAddress,
  shippingAddress: customer.shippingAddress,
});

const calculateSubtotal = (items) => {
  return items.reduce((total, item) => total + Number(item.amount), 0);
};

const populateDocument = async (id) => {
  return await Document.findById(id)
    .populate("customerId", "customerName email phone isActive")
    .populate(USER_POPULATION);
};

const calculateTaxes = (subtotal, taxes = []) => {
  const calculatedTaxes = taxes.map((tax) => {
    const amount = Number(((subtotal * tax.percentage) / 100).toFixed(2));

    return {
      name: tax.name,
      percentage: tax.percentage,
      amount,
    };
  });

  const totalTax = calculatedTaxes.reduce((sum, tax) => sum + tax.amount, 0);

  return {
    taxes: calculatedTaxes,
    totalTax: Number(totalTax.toFixed(2)),
  };
};

const calculateTotalAmount = (subtotal, totalTax) => {
  return Number((subtotal + totalTax).toFixed(2));
};

export const createDocument = async (data, currentUser) => {
  const customer = await Customer.findOne({
    _id: data.customerId,
    isActive: true,
  });

  if (!customer) {
    throw new ApiError(404, "Customer not found or inactive");
  }

  const documentNumber = await generateDocumentNumber(data.documentType);

  const customerSnapshot = createCustomerSnapshot(customer);

  const subtotal = calculateSubtotal(data.items);

  const { taxes, totalTax } = calculateTaxes(subtotal, data.taxes || []);

  const totalAmount = calculateTotalAmount(subtotal, totalTax);

  const document = await Document.create({
    documentType: data.documentType,

    documentNumber,

    documentDate: data.documentDate || new Date(),

    dueDate: data.dueDate,

    customerId: customer._id,

    customerSnapshot,

    items: data.items,

    subtotal,

    taxes,

    totalTax,

    totalAmount,

    notes: data.notes,

    createdBy: currentUser._id,

    updatedBy: currentUser._id,
  });

  try {
    const company = await Company.findOne().lean();

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    const pdf = await generatePdf({
      document,
      company,
    });

    document.pdf = {
      fileName: pdf.fileName,
      filePath: pdf.filePath,
      generatedAt: new Date(),
    };

    await document.save();
  } catch (error) {
    console.error("PDF Generation Error:", error);
  }

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "CREATE",
    entityType: "DOCUMENT",
    entityId: document._id,
    metadata: getDocumentAuditMetadata(document),
  });

  return await populateDocument(document._id);
};

export const getDocuments = async (query) => {
  const features = new QueryFeatures(Document, query)
    .search([
      "documentNumber",
      "customerSnapshot.customerName",
      "customerSnapshot.contactPerson",
      "customerSnapshot.email",
      "customerSnapshot.phone",
    ])
    .filter()
    .withSoftDelete();

  return await features.execute([
    {
      path: "customerId",
      select: "customerName email phone",
    },
    ...USER_POPULATION,
  ]);
};

export const getDocumentById = async (id) => {
  const document = await Document.findOne({
    _id: id,
    isDeleted: false,
  })
    .populate("customerId")
    .populate(USER_POPULATION);

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  return document;
};

export const updateDocument = async (id, data, currentUser) => {
  const document = await Document.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  if (data.customerId) {
    const customer = await Customer.findOne({
      _id: data.customerId,
      isActive: true,
    });

    if (!customer) {
      throw new ApiError(404, "Customer not found or inactive");
    }

    document.customerId = customer._id;
    document.customerSnapshot = createCustomerSnapshot(customer);
  }

  if (data.documentDate !== undefined) {
    document.documentDate = data.documentDate;
  }

  if (data.dueDate !== undefined) {
    document.dueDate = data.dueDate;
  }

  let subtotal = document.subtotal;
  let taxes = document.taxes;

  if (data.items) {
    document.items = data.items;
    subtotal = calculateSubtotal(data.items);
  }

  if (data.taxes) {
    taxes = data.taxes;
  }

  const calculatedTaxes = calculateTaxes(subtotal, taxes);

  document.subtotal = subtotal;
  document.taxes = calculatedTaxes.taxes;
  document.totalTax = calculatedTaxes.totalTax;
  document.totalAmount = calculateTotalAmount(
    subtotal,
    calculatedTaxes.totalTax,
  );

  if (data.notes !== undefined) {
    document.notes = data.notes;
  }

  document.updatedBy = currentUser._id;

  await document.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "DOCUMENT",
    entityId: document._id,
    metadata: getDocumentAuditMetadata(document),
  });

  return await populateDocument(document._id);
};

export const deleteDocument = async (id, currentUser) => {
  const document = await Document.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  document.isDeleted = true;
  document.deletedBy = currentUser._id;
  document.deletedAt = new Date();
  document.updatedBy = currentUser._id;

  await document.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "DELETE",
    entityType: "DOCUMENT",
    entityId: document._id,
    metadata: getDocumentAuditMetadata(document),
  });

  return await populateDocument(document._id);
};

export const downloadPdf = async (id) => {
  const document = await Document.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  if (!document.pdf?.filePath || !document.pdf?.fileName) {
    throw new ApiError(404, "PDF not found");
  }

  const filePath = path.join(process.cwd(), "src", document.pdf.filePath);

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, "PDF file does not exist");
  }

  return {
    fileName: document.pdf.fileName,
    filePath,
  };
};

export const regeneratePdf = async (id, currentUser) => {
  const document = await Document.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!document) {
    throw new ApiError(404, "Document not found");
  }

  const company = await Company.findOne().lean();

  if (!company) {
    throw new ApiError(404, "Company not found");
  }

  const pdf = await generatePdf({
    document,
    company,
  });

  document.pdf = {
    fileName: pdf.fileName,
    filePath: pdf.filePath,
    generatedAt: new Date(),
  };

  await document.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "REGENERATE_PDF",
    entityType: "DOCUMENT",
    entityId: document._id,
    metadata: getDocumentAuditMetadata(document),
  });

  return await populateDocument(document._id);
};
