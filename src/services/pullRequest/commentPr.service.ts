import { logger } from "../../observability/logger";
import type { PullRequestServiceContext } from "../../types/services";

export async function commentOnPullRequest(
  ctx: PullRequestServiceContext,
  body: string
): Promise<void> {
  const { octokit, owner, repo, pullRequestNumber } = ctx;

  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: pullRequestNumber,
    body,
  });
}
