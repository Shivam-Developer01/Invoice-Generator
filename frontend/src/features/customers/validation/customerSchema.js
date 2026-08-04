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

  contactPerson: z.string().trim().optional(),

  email: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      {
        message: "Enter a valid email",
      },
    ),

  phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),

  gstin: z
    .string()
    .trim()
    .refine(
      (value) =>
        value === "" ||
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(
          value.toUpperCase(),
        ),
      {
        message: "Invalid GSTIN",
      },
    ),

  pan: z.string().trim().min(1, "PAN is required"),

  billingAddress: addressSchema,

  shippingAddress: addressSchema,
});

export default customerSchema;
