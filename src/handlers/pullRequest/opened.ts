import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onPullRequestOpened(
  event: EmitterWebhookEvent<"pull_request.opened">
): Promise<void> {
  const { pull_request, repository } = event.payload;

  logger.info(
    {
      repo: repository.full_name,
      pr: pull_request.number,
    },
    "Pull request opened"
  );
}
