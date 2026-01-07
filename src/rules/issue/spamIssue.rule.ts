// src/rules/issue/spamIssue.rule.ts
import type { Issue } from "../../domain/issue/Issue";
import type { IssueDecision } from "../../domain/issue/IssueDecision";

const SPAM_KEYWORDS = [
  "free money",
  "click here",
  "crypto giveaway",
  "visit my profile",
];

export function spamIssueRule(issue: Issue): IssueDecision {
  const content = `${issue.title} ${issue.body ?? ""}`.toLowerCase();

  const isSpam = SPAM_KEYWORDS.some((k) => content.includes(k));

  if (isSpam) {
    return {
      action: "close",
      reason: "spam_detected",
      comment:
        "This issue was automatically closed because it was detected as spam.",
      labels: ["spam"],
    };
  }

  return { action: "ignore" };
}
