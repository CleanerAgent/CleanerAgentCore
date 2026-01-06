import "dotenv/config";
import { z } from "zod";

/**
 * Schema de validação das variáveis de ambiente
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

    PORT: z
    .string()
    .transform(Number)
    .refine((v) => !Number.isNaN(v), {
        message: "PORT must be a number",
    })
    .default(3000),

    APP_ID: z.string().optional(),
    WEBHOOK_SECRET: z.string().optional(),
    PRIVATE_KEY_PATH: z.string().optional()

});

/**
 * Parse e valida env
 */
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsed.error.format());
  process.exit(1);
}

export const config = parsed.data;
