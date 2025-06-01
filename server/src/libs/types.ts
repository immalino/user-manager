import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { usersTable } from "../db/schema";

export const createUserSchema = z.object({
  name: z.string().openapi({
    example: "John Doe",
  }),
  email: z.string().email({ message: "Email must be valid" }).openapi({
    example: "johndoe@example.com",
  }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 characters long" }).regex(/^\d+$/, { message: "Phone number must contain only numbers" }).openapi({
    example: "1234567890",
  }),
  department: z.string().min(1, { message: "Department cannot be empty" }).openapi({
    example: "IT",
  }),
});

export const selectUserSchema = createSelectSchema(usersTable);
