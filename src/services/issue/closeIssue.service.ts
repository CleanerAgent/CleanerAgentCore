// src/services/issue/closeIssue.service.ts
import { logger } from "../../observability/logger";
import type { IssueServiceContext } from "../../types/services";

export async function closeIssue(
  ctx: IssueServiceContext,
  reason?: string
): Promise<void> {
  const { octokit, owner, repo, issueNumber } = ctx;

  logger.info(
    { owner, repo, issueNumber, reason },
    "Closing issue"
  );

  await octokit.rest.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    state: "closed",
  });

  logger.info(
    { owner, repo, issueNumber },
    "Issue closed successfully"
  );
}
