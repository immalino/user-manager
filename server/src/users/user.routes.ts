import { createRoute } from "@hono/zod-openapi";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { createSuccessSchema, ErrorResponseSchema } from "../helpers/open-api";
import { createRouter } from "../libs/create-app";
import { createUserSchema, selectUserSchema } from "./user.schema";
import database from "../db";
import { usersTable } from "../db/schema";
import { HTTPException } from "hono/http-exception";
import { DrizzleQueryError } from "drizzle-orm/errors";

const createUserRoute = createRoute({
  method: "post",
  path: "/",
  request: {
    body: jsonContentRequired(createUserSchema, "Create user"),
  },
  responses: {
    201: jsonContent(createSuccessSchema(selectUserSchema, "Success create user"), "Created"),
    400: jsonContent(createErrorSchema(createUserSchema), "Bad request"),
    409: jsonContent(ErrorResponseSchema( "Email already exists", true), "Conflict"),
    500: jsonContent(ErrorResponseSchema("Internal Server Error", false), "Internal Server Error"),
  },
});

export const userRouter = createRouter()
  .openapi(createUserRoute, async (c) => {
    const userData = c.req.valid("json");
    try {
      const [newUser] = await database.insert(usersTable).values(userData).returning();
      return c.json({
        success: true,
        message: "Success create user",
        data: {...newUser, updatedAt: newUser.updatedAt || newUser.createdAt},
      }, 201);
    } catch (error) {
      console.log(error)
      if (error instanceof DrizzleQueryError && error.cause?.message === 'duplicate key value violates unique constraint "users_email_unique"') {
        throw new HTTPException(409, {
          message: "Email already exists",
          cause: { form: true },
        });
      }
      throw new HTTPException( 500, { message: "Internal Server Error" });
    }
  });
