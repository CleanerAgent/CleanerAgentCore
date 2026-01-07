import type { Webhooks } from "@octokit/webhooks";
import { onIssueCommentCreated } from "./created";

export function registerIssueCommentHandlers(
  webhooks: Webhooks
): void {
  webhooks.on("issue_comment.created", onIssueCommentCreated);
}
