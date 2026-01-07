import { logger } from "../observability/logger";

export function logDebug(message: string, data?: unknown) {
  logger.debug(data ?? {}, message);
}
