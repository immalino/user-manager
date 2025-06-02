export interface ErrorResponse {
  success: false;
  error: string;
  isFormError?: boolean;
}

export type {
  CreateUser,
  GetUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
} from "../server/src/users/user.routes";
