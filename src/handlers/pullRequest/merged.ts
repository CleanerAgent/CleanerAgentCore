// src/handlers/pullRequest/merged.ts
import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

/**
 * Logical merged handler.
 * This is triggered from pull_request.closed
 */
export async function onPullRequestMerged(
  event: EmitterWebhookEvent<"pull_request.closed">
): Promise<void> {
  const { pull_request, repository } = event.payload;

  if (!pull_request.merged) return;

  logger.info(
    {
      pr: pull_request.number,
      repo: repository.full_name,
    },
    "Pull request merged"
  );
}
