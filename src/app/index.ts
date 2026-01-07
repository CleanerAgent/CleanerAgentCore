import { logger } from "../observability";

import { initGitHubApp } from "./githubApp";
import { handleWebhookRequest } from "./webhookServer";

/**
 * Application runtime
 * Expõe apenas capacidades, não implementação
 */
export interface AppRuntime {
  webhookHandler: typeof handleWebhookRequest;
}

/**
 * Initialize application
 */
export function initApp(): AppRuntime {
  logger.info("Initializing application");

  // Initialize GitHub App (auth, octokit, webhooks)
  initGitHubApp();

  logger.info("Application initialized");

  return {
    webhookHandler: handleWebhookRequest,
  };
}
