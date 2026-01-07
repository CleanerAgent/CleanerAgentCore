import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onPullRequestClosed(
  event: EmitterWebhookEvent<"pull_request.closed">
): Promise<void> {
  const { pull_request } = event.payload;

  logger.info(
    {
      pr: pull_request.number,
      merged: pull_request.merged,
    },
    "Pull request closed"
  );
}
