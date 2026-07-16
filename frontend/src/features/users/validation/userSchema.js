import { z } from "zod";

function userSchema(isEditMode = false) {
  return z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),

    email: z.string().email("Invalid email address"),

    password: isEditMode
      ? z.string().optional()
      : z
          .string()
          .min(8, "Password must be at least 8 characters")
          .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/,
            "Password must contain uppercase, lowercase, number and special character",
          ),

    role: z.enum(["CO_FOUNDER", "MANAGER", "ACCOUNTANT", "OTHERS"]),
  });
}

export default userSchema;
