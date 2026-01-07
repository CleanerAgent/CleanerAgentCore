import type { PullRequest } from "../domain/pullRequest/PullRequest";
import type { PullRequestDecision } from "../domain/pullRequest/PullRequestDecision";

import { invalidPullRequestRule } from "../rules/pullRequests";

export function pullRequestPolicy(
  pr: PullRequest
): PullRequestDecision {
  const rules = [
    invalidPullRequestRule,
  ];

  for (const rule of rules) {
    const decision = rule(pr);

    if (decision.action !== "ignore") {
      return decision;
    }
  }

  return { action: "ignore" };
}
