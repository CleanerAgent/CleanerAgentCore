import { AppError, type AppErrorMetadata } from "./AppError";

export interface GitHubErrorContext extends AppErrorMetadata {
  status?: number;
  requestId?: string;
  documentationUrl?: string;
  endpoint?: string;
  remainingRateLimit?: number;
  resetRateLimitAt?: number;
}

export class GitHubError extends AppError {
  public readonly context?: GitHubErrorContext;

  constructor(
    message: string,
    context?: GitHubErrorContext
  ) {
    super(message, {
      code: "GITHUB_API_ERROR",
      statusCode: context?.status ?? 502,
      isOperational: true,
      metadata: context,
    });

    this.context = context;
  }

  static fromUnknown(error: unknown): GitHubError {
    if (error instanceof GitHubError) {
      return error;
    }

    if (error && typeof error === "object") {
      const anyError = error as any;

      return new GitHubError(
        anyError.message ?? "Unknown GitHub API error",
        {
          status: anyError.status,
          requestId: anyError.request?.id,
          documentationUrl: anyError.documentation_url,
          endpoint: anyError.request?.url,
          remainingRateLimit: anyError.headers?.["x-ratelimit-remaining"]
            ? Number(anyError.headers["x-ratelimit-remaining"])
            : undefined,
          resetRateLimitAt: anyError.headers?.["x-ratelimit-reset"]
            ? Number(anyError.headers["x-ratelimit-reset"]) * 1000
            : undefined,
        }
      );
    }

    return new GitHubError("Unknown GitHub API error");
  }
}
