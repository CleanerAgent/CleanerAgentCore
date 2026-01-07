import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onIssueEdited(
  event: EmitterWebhookEvent<"issues.edited">
): Promise<void> {
  const { issue, changes } = event.payload;

  logger.info(
    {
      issue: issue.number,
      changes,
    },
    "Issue edited"
  );
}
