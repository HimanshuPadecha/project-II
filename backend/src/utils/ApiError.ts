class ApiError extends Error {
  statusCode: number;
  errors: Array<Object> = [];
  data: {} | null;
  success: boolean;
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: Array<object> = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors
  }
}

export { ApiError };
