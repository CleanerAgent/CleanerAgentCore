import type { EmitterWebhookEvent } from "@octokit/webhooks";

export type IssueOpenedEvent = EmitterWebhookEvent<"issues.opened">;
export type IssueEditedEvent = EmitterWebhookEvent<"issues.edited">;
export type IssueClosedEvent = EmitterWebhookEvent<"issues.closed">;

export type PullRequestOpenedEvent =
  EmitterWebhookEvent<"pull_request.opened">;
export type PullRequestClosedEvent =
  EmitterWebhookEvent<"pull_request.closed">;
export type PullRequestSynchronizeEvent =
  EmitterWebhookEvent<"pull_request.synchronize">;

export type IssueCommentCreatedEvent =
  EmitterWebhookEvent<"issue_comment.created">;
export type IssueCommentDeletedEvent =
  EmitterWebhookEvent<"issue_comment.deleted">;
