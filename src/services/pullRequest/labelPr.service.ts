import type { PullRequestServiceContext } from "../../types/services";

export async function addLabelsToPullRequest(
  ctx: PullRequestServiceContext,
  labels: string[]
): Promise<void> {
  if (!labels.length) return;

  const { octokit, owner, repo, pullRequestNumber } = ctx;

  await octokit.rest.issues.addLabels({
    owner,
    repo,
    issue_number: pullRequestNumber,
    labels,
  });
}
