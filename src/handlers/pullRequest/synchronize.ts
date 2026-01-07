import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onPullRequestSynchronize(
  event: EmitterWebhookEvent<"pull_request.synchronize">
): Promise<void> {
  const { pull_request } = event.payload;

  logger.info(
    {
      pr: pull_request.number,
      commits: pull_request.commits,
    },
    "Pull request synchronized"
  );
}
