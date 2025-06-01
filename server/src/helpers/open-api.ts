import z from "zod";

export function createSuccessSchema<T extends z.ZodSchema>(
  dataSchema: T,
  message: string = "Success"
) {
  return z.object({
    success: z.boolean().openapi({ example: true }),
    message: z.string().openapi({ example: message }),
    data: dataSchema.optional(),
  });
}

export function ErrorResponseSchema(
  errorMessage: string,
  isFormError: boolean = true
) {
  return z.object({
    success: z.boolean().openapi({ example: false }),
    error: z.string().openapi({ example: errorMessage }),
    isFormError: z.boolean().optional().openapi({ example: isFormError }),
  });
}