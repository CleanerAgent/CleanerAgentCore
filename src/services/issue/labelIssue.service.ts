import { logger } from "../../observability/logger";
import type { IssueServiceContext } from "../../types/services";

export async function labelIssueService(
  ctx: IssueServiceContext,
  labels: string[]
): Promise<void> {
  const { octokit, owner, repo, issueNumber } = ctx;

  if (!labels.length) return;

  logger.info(
    { owner, repo, issueNumber, labels },
    "Adding labels to issue"
  );

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels,
  });

  logger.info(
    { owner, repo, issueNumber },
    "Labels added to issue"
  );
}
