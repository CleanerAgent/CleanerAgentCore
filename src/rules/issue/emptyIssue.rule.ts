// src/rules/issue/emptyIssue.rule.ts
import type { Issue } from "../../domain/issue/Issue";
import type { IssueDecision } from "../../domain/issue/IssueDecision";

export function emptyIssueRule(issue: Issue): IssueDecision {
  const title = issue.title.trim();
  const body = issue.body?.trim() ?? "";

  if (title.length === 0 && body.length === 0) {
    return {
      action: "close",
      reason: "empty_issue",
      comment:
        "This issue was automatically closed because it does not contain a title or description.",
      labels: ["invalid"],
    };
  }

  return { action: "ignore" };
}
