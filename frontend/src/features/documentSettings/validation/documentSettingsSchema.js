import { z } from "zod";

const documentSettingsSchema = z.object({
  companyPrefix: z.string().min(1, "Company prefix is required"),

  separator: z.string().min(1, "Separator is required"),

  financialYear: z.string().min(2).max(4),

  resetYearly: z.boolean(),

  documentPrefixes: z.array(
    z.object({
      type: z.string(),

      prefix: z.string().min(1, "Prefix is required"),
    }),
  ),
});

export default documentSettingsSchema;
