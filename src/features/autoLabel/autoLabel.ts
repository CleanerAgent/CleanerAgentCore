import { IssueContext } from "../../domain/issue/IssueContext";
import { labelIssueService } from "../../services/issue/labelIssue.service";
import { increment } from "../../telemetry/metrics";
import { logger } from "../../observability/logger";

export async function autoLabelIssueFeature(
  context: IssueContext,
  labels: string[]
): Promise<void> {
  if (labels.length === 0) return;

  logger.info(
    {
      issue: context.issue.number,
      labels,
    },
    "Auto-labeling issue"
  );

  await labelIssueService(
    {
      octokit: context.octokit,
      owner: context.repository.owner,
      repo: context.repository.repo,
      issueNumber: context.issue.number,
    },
    labels
  );

  increment("issue.autolabel.executed");
}
