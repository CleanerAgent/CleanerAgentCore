import { Webhooks } from "@octokit/webhooks";
import { logger } from "../observability/logger";

import { registerIssueHandlers } from "./issues/register";
import { registerPullRequestHandlers } from "./pullRequest/register";
import { registerIssueCommentHandlers } from "./issueComments/register";

/**
 * Register all GitHub webhook handlers
 * This is the single wiring point between GitHub events and domain logic
 */
export function registerAllHandlers(webhooks: Webhooks): void {
  logger.info("Registering GitHub webhook handlers");

  registerIssueHandlers(webhooks);
  registerPullRequestHandlers(webhooks);
  registerIssueCommentHandlers(webhooks);

  logger.info("All GitHub webhook handlers registered");
}
