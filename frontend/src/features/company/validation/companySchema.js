import { z } from "zod";

const addressSchema = z.object({
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  pincode: z.string().optional(),
});

const bankSchema = z.object({
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  ifscCode: z.string().optional(),
  branch: z.string().optional(),
  upiId: z
    .string()
    .trim()
    .regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID")
    .optional()
    .or(z.literal("")),
});

const gstOptionSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
  percentage: z.coerce.number().min(0),
  active: z.boolean(),
});

const companySchema = z.object({
  companyName: z.string().min(1, "Company name is required"),

  gstin: z.string().min(1, "GSTIN is required"),

  pan: z.string().min(1, "PAN is required"),

  email: z.string().email("Invalid email"),

  phone: z.string().min(10, "Phone is required"),

  website: z.string().optional(),

  logoUrl: z.string().optional(),

  addresses: z.object({
    registeredOffice: addressSchema,
    corporateOffice: addressSchema,
  }),

  bankDetails: bankSchema,

  gstOptions: z.array(gstOptionSchema),
});

export default companySchema;
