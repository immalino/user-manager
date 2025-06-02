import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Email must be valid" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
  isActive: z.boolean().default(true),
  department: z.string().min(1, { message: "Department cannot be empty" }),
});

export const selectUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  isActive: z.boolean(),
  department: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const updateUserSchema = createUserSchema.partial();
