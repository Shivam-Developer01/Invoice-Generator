import { z } from "zod";

const itemSchema = z.object({
  description: z.string().trim().min(1, "Description is required"),

  hsnSacCode: z.string().trim().optional(),

  amount: z
    .number({
      invalid_type_error: "Amount is required",
    })
    .min(0, "Amount cannot be negative"),
});

const documentSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),

  documentDate: z.string(),

  dueDate: z.string().optional(),

  items: z.array(itemSchema).min(1, "At least one item is required"),

  taxes: z.array(z.any()).optional(),

  notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional(),
});

export default documentSchema;
