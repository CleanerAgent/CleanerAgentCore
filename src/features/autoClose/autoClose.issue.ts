import { issuePolicy } from "../../policies/issue.policy";
import { closeIssue } from "../../services/issue/closeIssue.service";
import type { IssueContext } from "../../domain/issue/IssueContext";
import { logger } from "../../observability/logger";
import { increment } from "../../telemetry/metrics";

export async function autoCloseIssueFeature(
  context: IssueContext
): Promise<void> {
  const decision = issuePolicy(context.issue);

 if (decision.action === "close") {
  logger.info(
    {
      issue: context.issue.number,
      reason: decision.reason,
    },
    "Auto-closing issue"
  );

  await closeIssue(
    {
      octokit: context.octokit,
      owner: context.repository.owner,
      repo: context.repository.repo,
      issueNumber: context.issue.number,
    },
    decision.reason // agora é string garantido
  );

  increment("issue.autoclose.executed");
  return;
}

// fallback (ignore / label / comment)
increment("issue.autoclose.skipped", {
  reason: decision.reason ?? "policy_ignore",
});
}