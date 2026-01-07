import "dotenv/config";
import { envSchema, type Env } from "./env.schema";

/**
 * Load and validate environment variables
 */
function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.format());
    process.exit(1);
  }

  return parsed.data;
}

/**
 * Application configuration (internal)
 */
export const internalConfig = loadEnv();
