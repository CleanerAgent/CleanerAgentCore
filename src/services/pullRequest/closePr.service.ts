import { logger } from "../../observability/logger";
import type { PullRequestServiceContext } from "../../types/services";

export async function closePrService(
  ctx: PullRequestServiceContext
): Promise<void> {
  const { octokit, owner, repo, pullRequestNumber } = ctx;

  logger.info(
    { owner, repo, pullRequestNumber },
    "Closing pull request"
  );

  await octokit.rest.pulls.update({
    owner,
    repo,
    pull_number: pullRequestNumber,
    state: "closed",
  });

  logger.info(
    { owner, repo, pullRequestNumber },
    "Pull request closed"
  );
}
