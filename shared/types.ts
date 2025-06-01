export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? object : { data: T });

export interface ErrorResponse {
  success: false;
  error: string;
  isFormError?: boolean;
}

import { router } from "@/src";
export type AppType = typeof router;

export type { CreateUser, GetUsers, GetUser, UpdateUser, DeleteUser } from "../server/src/users/user.routes"
