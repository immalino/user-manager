import z from "zod";

import { usersTable } from "../db/schema";

export const createUserSchema = z.object({
  name: z.string().openapi({
    example: "John Doe",
  }),
  email: z.string().email({ message: "Email must be valid" }).openapi({
    example: "johndoe@example.com",
  }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 characters long" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" })
    .openapi({
      example: "1234567890",
    }),
  isActive: z.boolean().default(true).openapi({
    example: true,
  }),
  department: z
    .string()
    .min(1, { message: "Department cannot be empty" })
    .openapi({
      example: "IT",
    }),
});

export const selectUserSchema = z.object({
  id: z.string().uuid().openapi({
    example: "e88ad2a9-e54d-4b99-9eeb-331acda4340b",
  }),
  name: z.string().openapi({
    example: "John Doe",
  }),
  email: z.string().email().openapi({
    example: "johndoe@example.com",
  }),
  phone: z.string().openapi({
    example: "1234567890",
  }),
  isActive: z.boolean().openapi({
    example: true,
  }),
  department: z.string().openapi({
    example: "IT",
  }),
  createdAt: z.string().datetime().openapi({
    example: "2025-05-31T00:00:00.000Z",
  }),
  updatedAt: z.string().datetime().openapi({
    example: "2025-05-31T00:00:00.000Z",
  }),
});

export const updateUserSchema = createUserSchema.partial();

export const User = usersTable.$inferSelect;
