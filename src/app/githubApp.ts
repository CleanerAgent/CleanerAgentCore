import { App } from "@octokit/app";
import fs from "node:fs";
import path from "node:path";

import { config } from "../config";
import { logger } from "../observability/logger";

export interface GitHubAppRuntime {
  app: App;
}

let runtime: GitHubAppRuntime | null = null;

function loadPrivateKey(): string {
  const keyPath = path.resolve(config.PRIVATE_KEY_PATH);

  if (!fs.existsSync(keyPath)) {
    throw new Error(`GitHub App private key not found: ${keyPath}`);
  }

  return fs.readFileSync(keyPath, "utf8");
}

export function initGitHubApp(): GitHubAppRuntime {
  if (runtime) {
    logger.warn("GitHub App already initialized");
    return runtime;
  }

  const app = new App({
    appId: config.APP_ID,
    privateKey: loadPrivateKey(),
    webhooks: { secret: config.WEBHOOK_SECRET },
  });

  runtime = { app };
  return runtime;
}

/**
 * ❗ NÃO tipa o retorno aqui
 */
export function getAppOctokit() {
  if (!runtime) throw new Error("GitHub App not initialized");
  return runtime.app.octokit;
}

export async function getInstallationOctokit(
  installationId: number
) {
  if (!runtime) throw new Error("GitHub App not initialized");
  return runtime.app.getInstallationOctokit(installationId);
}
