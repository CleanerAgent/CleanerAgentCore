import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onIssueClosed(
  event: EmitterWebhookEvent<"issues.closed">
): Promise<void> {
  const { issue } = event.payload;

  logger.info(
    {
      issue: issue.number,
      state: issue.state,
    },
    "Issue closed"
  );
}
