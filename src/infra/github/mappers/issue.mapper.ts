import type { EmitterWebhookEvent } from "@octokit/webhooks";
import type { Issue } from "../../../domain/issue/Issue";

/**
 * Tipo correto do Issue vindo de webhook
 */
type GitHubWebhookIssue =
  EmitterWebhookEvent<"issues.opened">["payload"]["issue"];

export function mapGitHubIssueToDomain(
  issue: GitHubWebhookIssue
): Issue {
  const state: "open" | "closed" =
    issue.state === "closed" ? "closed" : "open";

  return {
    id: issue.id,
    number: issue.number,

    title: issue.title,
    body: issue.body ?? "",

    state,

    author: {
      login: issue.user?.login ?? "unknown",
      id: issue.user?.id ?? 0,
    },

    labels:
      issue.labels?.map((label) =>
        typeof label === "string" ? label : label.name ?? ""
      ) ?? [],

    createdAt: issue.created_at ?? new Date().toISOString(),
    updatedAt: issue.updated_at ?? new Date().toISOString(),

    isPullRequest: Boolean(issue.pull_request),
  };
}
