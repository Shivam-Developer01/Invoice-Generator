import asyncHandler from "../middleware/async.middleware.js";
import ApiResponse from "../errors/ApiResponse.js";

import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  updateCustomerStatus,
} from "../services/customer.service.js";

export const create = asyncHandler(async (req, res) => {
  const customer = await createCustomer(req.body, req.user);

  return res
    .status(201)
    .json(new ApiResponse(201, "Customer created successfully", customer));
});

export const getAll = asyncHandler(async (req, res) => {
  const customers = await getCustomers(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Customers fetched successfully", customers));
});

export const getOne = asyncHandler(async (req, res) => {
  const customer = await getCustomerById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Customer fetched successfully", customer));
});

export const update = asyncHandler(async (req, res) => {
  const customer = await updateCustomer(req.params.id, req.body, req.user);

  return res
    .status(200)
    .json(new ApiResponse(200, "Customer updated successfully", customer));
});

export const updateStatus = asyncHandler(async (req, res) => {
  const customer = await updateCustomerStatus(
    req.params.id,
    req.body.isActive,
    req.user._id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Customer status updated successfully", customer),
    );
});
