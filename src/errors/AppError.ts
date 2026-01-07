export interface AppErrorMetadata {
  [key: string]: unknown;
}

export abstract class AppError extends Error {
  public readonly name: string;
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly metadata?: AppErrorMetadata;

  protected constructor(
    message: string,
    options: {
      code: string;
      statusCode?: number;
      isOperational?: boolean;
      metadata?: AppErrorMetadata;
    }
  ) {
    super(message);

    this.name = this.constructor.name;
    this.code = options.code;
    this.statusCode = options.statusCode ?? 500;
    this.isOperational = options.isOperational ?? true;
    this.metadata = options.metadata;

    Error.captureStackTrace(this, this.constructor);
  }
}
