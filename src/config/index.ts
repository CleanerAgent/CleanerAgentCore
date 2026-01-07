import { internalConfig } from "./config";

/**
 * Public application configuration
 */
export const config = internalConfig;

export type AppConfig = typeof config;
