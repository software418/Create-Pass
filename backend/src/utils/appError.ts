class AppError extends Error {
  // 1. Declare property types here
  public statusCode: number;
  public errorCode: string | number;
  public errors?: any; // Optional property
  public isOperational: boolean;

  constructor(message: string, statusCode: number, errorCode: string | number, errors?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.errors = errors;
    this.isOperational = true;

    // Use Error.captureStackTrace only if it exists (Node.js environments)
    
  }
}

export default AppError;
