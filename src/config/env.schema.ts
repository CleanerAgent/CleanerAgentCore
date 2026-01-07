import { z } from "zod";

/**
 * Environment schema
 */
export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  PORT: z.coerce.number().int().positive().default(3000),

  APP_ID: z.string().min(1, "APP_ID is required"),

  WEBHOOK_SECRET: z.string().min(1, "WEBHOOK_SECRET is required"),

  PRIVATE_KEY_PATH: z.string().min(1, "PRIVATE_KEY_PATH is required"),
});

export type Env = z.infer<typeof envSchema>;
