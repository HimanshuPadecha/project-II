import axios, { AxiosError } from "axios";

// Represents the shape of your backend ApiError
export interface ApiErrorResponse {
  statusCode?: number;
  message?: string;
  errors?: Array<any>;
  success?: boolean;
}

/**
 * Helper function to safely extract the error message from an API exception.
 * It is aware of the backend ApiError format.
 * 
 * @param error The exception thrown from a catch block
 * @param defaultMessage A fallback message if extraction fails
 * @returns A safe, human-readable error message string
 */
export const handleApiError = (
  error: unknown,
  defaultMessage: string = "Something went wrong"
): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const data = axiosError.response?.data;

    // Direct message given by ApiError constructor
    if (data?.message) {
      return data.message;
    }

    // In case there are specific field errors passed from validation
    if (data?.errors && data.errors.length > 0) {
      const firstError = data.errors[0];
      if (typeof firstError === "string") return firstError;
      if (firstError.message) return firstError.message;
      return JSON.stringify(firstError);
    }
  }

  // Fallback for native JS errors
  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};
