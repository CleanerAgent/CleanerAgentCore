// src/policies/issue.policy.ts
import type { Issue } from "../domain/issue/Issue";
import type { IssueDecision } from "../domain/issue/IssueDecision";

import {
  emptyIssueRule,
  spamIssueRule,
} from "../rules/issue";

export function issuePolicy(issue: Issue): IssueDecision {
  const rules = [
    emptyIssueRule,
    spamIssueRule,
  ];

  for (const rule of rules) {
    const decision = rule(issue);

    if (decision.action !== "ignore") {
      return decision;
    }
  }

  return { action: "ignore" };
}
