import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onIssueCommentCreated(
  event: EmitterWebhookEvent<"issue_comment.created">
): Promise<void> {
  const { comment, issue } = event.payload;

  logger.info(
    {
      issue: issue.number,
      comment: comment.id,
    },
    "Issue comment created"
  );
}
