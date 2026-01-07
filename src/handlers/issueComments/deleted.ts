// src/handlers/issueComments/deleted.ts
import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

export async function onIssueCommentDeleted(
  event: EmitterWebhookEvent<"issue_comment.deleted">
): Promise<void> {
  const { issue, comment } = event.payload;

  logger.info(
    {
      issue: issue.number,
      commentId: comment.id,
    },
    "Issue comment deleted"
  );
}
