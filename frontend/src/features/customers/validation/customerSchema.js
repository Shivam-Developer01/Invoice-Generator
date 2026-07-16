import { z } from "zod";

const addressSchema = z.object({
  addressLine1: z.string().trim().optional(),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().optional(),
  state: z.string().trim().optional(),
  country: z.string().trim().optional(),
  pincode: z.string().trim().optional(),
});

const customerSchema = z.object({
  customerName: z.string().trim().min(1, "Customer name is required"),

  contactPerson: z.string().trim().min(1, "Contact person is required"),

  email: z.string().trim().email("Enter a valid email"),

  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),

  gstin: z.string().trim().min(1, "GSTIN is required"),

  pan: z.string().trim().min(1, "PAN is required"),

  billingAddress: addressSchema,

  shippingAddress: addressSchema,
});

export default customerSchema;
