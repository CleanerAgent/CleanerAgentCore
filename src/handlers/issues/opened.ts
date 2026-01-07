import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onIssueOpened(
  event: EmitterWebhookEvent<"issues.opened">
): Promise<void> {
  const { issue, repository } = event.payload;

  logger.info(
    {
      repo: repository.full_name,
      issue: issue.number,
    },
    "Issue opened"
  );
}
