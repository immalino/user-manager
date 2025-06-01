import { createRoute, z } from "@hono/zod-openapi";
import { jsonContent, jsonContentOneOf, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

import { createSuccessSchema, ErrorResponseSchema, SuccessResponseSchema } from "../helpers/open-api";
import { createRouter } from "../libs/create-app";
import { createUserSchema, selectUserSchema, updateUserSchema } from "./user.schema";
import database from "../db";
import { usersTable } from "../db/schema";
import { HTTPException } from "hono/http-exception";
import { DrizzleQueryError } from "drizzle-orm/errors";
import { eq, ilike } from "drizzle-orm";

const tags = ["Users"];

const createUserRoute = createRoute({
  method: "post",
  tags,
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

const getUsersRoute = createRoute({
  method: "get",
  tags,
  path: "/",
  request: {
    query: z.object({
      search: z.string().optional(),
    }),
  },
  responses: {
    200: jsonContent(
      createSuccessSchema(z.array(selectUserSchema), "Success get users"),
      "OK"
    ),
    500: jsonContent(
      ErrorResponseSchema("Internal Server Error", false),
      "Internal Server Error"
    ),
  },
})

const getUserRoute = createRoute({
  method: "get",
  tags,
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: jsonContent(
      createSuccessSchema(selectUserSchema, "Success get user"),
      "OK"
    ),
    400: jsonContent(
      createErrorSchema(
        z.object({
          id: z.string().uuid(),
        })
      ),
      "Bad request"
    ),
    404: jsonContent(ErrorResponseSchema("User not found", false), "Not found"),
    500: jsonContent(
      ErrorResponseSchema("Internal Server Error", false),
      "Internal Server Error"
    ),
  },
});

const updateUserRoute = createRoute({
  method: "put",
  tags,
  path: "/{id}",
  request: {
    body: jsonContentRequired(updateUserSchema, "Create user"),
    params: z.object({
      id: z.string().uuid(),
    })
  },
  responses: {
    201: jsonContent(
      createSuccessSchema(selectUserSchema, "Success update user"),
      "Updated"
    ),
    400: jsonContentOneOf([createErrorSchema(updateUserSchema), createErrorSchema(z.object({ id: z.string().uuid() }))], "Bad request"),
    404: jsonContent(ErrorResponseSchema("User not found", false), "Not found"),
    409: jsonContent(
      ErrorResponseSchema("Email already exists", true),
      "Conflict"
    ),
    500: jsonContent(
      ErrorResponseSchema("Internal Server Error", false),
      "Internal Server Error"
    ),
  },
});

const deleteUserRoute = createRoute({
  method: "delete",
  tags,
  path: "/{id}",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: jsonContent(
      SuccessResponseSchema("Success delete user"),
      "Deleted"
    ),
    400: jsonContent(
      createErrorSchema(
        z.object({
          id: z.string().uuid(),
        })
      ),
      "Bad request"
    ),
    404: jsonContent(ErrorResponseSchema("User not found", false), "Not found"),
    500: jsonContent(
      ErrorResponseSchema("Internal Server Error", false),
      "Internal Server Error"
    ),
  }
})

export const userRouter = createRouter()
  .openapi(createUserRoute, async (c) => {
    const userData = c.req.valid("json");
    try {
      const [newUser] = await database
        .insert(usersTable)
        .values(userData)
        .returning();
      return c.json(
        {
          success: true,
          message: "Success create user",
          data: newUser,
        },
        201
      );
    } catch (error) {
      if (
        error instanceof DrizzleQueryError &&
        error.cause?.message ===
          'duplicate key value violates unique constraint "users_email_unique"'
      ) {
        throw new HTTPException(409, {
          message: "Email already exists",
          cause: { form: true },
        });
      }
      throw new HTTPException(500, { message: "Internal Server Error" });
    }
  })
  .openapi(getUsersRoute, async (c) => {
    const { search } = c.req.valid("query");
    const users = await database
      .select()
      .from(usersTable)
      .where(search ? ilike(usersTable.name, `%${search}%`) : undefined);
    return c.json(
      {
        success: true,
        message: "Success get users",
        data: users,
      },
      200
    );
  })
  .openapi(getUserRoute, async (c) => {
    const { id } = c.req.valid("param");
    const [user] = await database
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    return c.json(
      {
        success: true,
        message: "Success get user",
        data: user,
      },
      200
    );
  })
  .openapi(updateUserRoute, async (c) => {
    const { id } = c.req.valid("param");
    const userData = c.req.valid("json");

    let updatedUser

    try {
      [updatedUser] = await database
        .update(usersTable)
        .set(userData)
        .where(eq(usersTable.id, id))
        .returning();
    } catch (error) {
      if (
        error instanceof DrizzleQueryError &&
        error.cause?.message ===
          'duplicate key value violates unique constraint "users_email_unique"') {
        throw new HTTPException(409, {
          message: "Email already exists",
          cause: { form: true },
        });
      }

      throw new HTTPException(500, { message: "Internal Server Error" });
    }

    if (!updatedUser) {
     throw new HTTPException(404, { message: "User not found" });
    }

    return c.json(
      {
        success: true,
        message: "Success update user",
        data: updatedUser,
      },
      201
    );
  })
  .openapi(deleteUserRoute, async (c) => {
    const { id } = c.req.valid("param");
    const [deletedUser] = await database
      .delete(usersTable)
      .where(eq(usersTable.id, id)).returning();

    if (!deletedUser) {
      throw new HTTPException(404, { message: "User not found" });
    }
    return c.json(
      {
        success: true,
        message: "Success delete user",
      },
      200
    );
  });
