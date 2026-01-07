// src/rules/pullRequests/invalidPr.rule.ts
import type { PullRequest } from "../../domain/pullRequest/PullRequest";
import type { PullRequestDecision } from "../../domain/pullRequest/PullRequestDecision";

export function invalidPullRequestRule(
  pr: PullRequest
): PullRequestDecision {
  if (!pr.title || pr.title.trim().length < 5) {
    return {
      action: "close",
      reason: "invalid_pr_title",
      comment:
        "This pull request was automatically closed because the title is too short or missing.",
      labels: ["invalid"],
    };
  }

  return { action: "ignore" };
}
