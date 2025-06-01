export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? object : { data: T });

export interface ErrorResponse {
  success: false;
  error: string;
  isFormError?: boolean;
}
