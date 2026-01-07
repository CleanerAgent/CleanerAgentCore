// src/services/issue/commentIssue.service.ts
import { logger } from "../../observability/logger";
import type { IssueServiceContext } from "../../types/services";

export async function commentOnIssue(
  ctx: IssueServiceContext,
  body: string
): Promise<void> {
  const { octokit, owner, repo, issueNumber } = ctx;

  logger.info(
    { owner, repo, issueNumber },
    "Commenting on issue"
  );

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body,
  });

  logger.info(
    { owner, repo, issueNumber },
    "Issue comment created"
  );
}
