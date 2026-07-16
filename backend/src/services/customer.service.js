import Customer from "../models/customer.model.js";
import ApiError from "../errors/ApiError.js";
import QueryFeatures from "../utils/queryFeatures.js";
import { USER_POPULATION } from "../constants/populate.js";
import { createAuditLog } from "./auditLog.service.js";

export const createCustomer = async (data, currentUser) => {
  const existingCustomer = await Customer.findOne({
    $or: [
      ...(data.email ? [{ email: data.email }] : []),
      ...(data.phone ? [{ phone: data.phone }] : []),
      ...(data.gstin ? [{ gstin: data.gstin }] : []),
    ],
  });

  if (existingCustomer) {
    throw new ApiError(
      409,
      "Customer already exists with the same email, phone or GSTIN",
    );
  }

  const customer = await Customer.create({
    ...data,
    createdBy: currentUser._id,
    updatedBy: currentUser._id,
  });

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "CREATE",
    entityType: "CUSTOMER",
    entityId: customer._id,
    metadata: {
      customerName: customer.customerName,
      gstin: customer.gstin,
      email: customer.email,
    },
  });

  return await Customer.findById(customer._id).populate(USER_POPULATION);
};

export const getCustomers = async (query) => {
  const features = new QueryFeatures(Customer, query)
    .search(["customerName", "contactPerson", "email", "phone", "gstin", "pan"])
    .filter();

  return await features.execute(USER_POPULATION);
};

export const getCustomerById = async (id) => {
  const customer = await Customer.findById(id).populate(USER_POPULATION);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return customer;
};

export const updateCustomer = async (id, data, currentUser) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  if (data.email && data.email !== customer.email) {
    const exists = await Customer.findOne({
      email: data.email,
      _id: { $ne: id },
    });

    if (exists) {
      throw new ApiError(409, "Customer with this email already exists");
    }
  }

  if (data.phone && data.phone !== customer.phone) {
    const exists = await Customer.findOne({
      phone: data.phone,
      _id: { $ne: id },
    });

    if (exists) {
      throw new ApiError(409, "Customer with this phone already exists");
    }
  }

  if (data.gstin && data.gstin !== customer.gstin) {
    const exists = await Customer.findOne({
      gstin: data.gstin,
      _id: { $ne: id },
    });

    if (exists) {
      throw new ApiError(409, "Customer with this GSTIN already exists");
    }
  }

  Object.assign(customer, data);

  customer.updatedBy = currentUser._id;

  await customer.save();

  await createAuditLog({
    userId: currentUser._id,
    userName: currentUser.name,
    action: "UPDATE",
    entityType: "CUSTOMER",
    entityId: customer._id,
    metadata: {
      customerName: customer.customerName,
      gstin: customer.gstin,
      email: customer.email,
    },
  });

  return await Customer.findById(customer._id).populate(USER_POPULATION);
};

export const updateCustomerStatus = async (id, isActive, userId) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  customer.isActive = isActive;
  customer.updatedBy = userId;

  await customer.save();

  return await Customer.findById(customer._id).populate(USER_POPULATION);
};