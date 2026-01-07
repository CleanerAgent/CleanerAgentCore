import type { PullRequestContext } from "../../domain/pullRequest/PullRequestContext";
import { pullRequestPolicy } from "../../policies/pullRequest.policy";
import { closePrService } from "../../services/pullRequest/closePr.service";
import { increment } from "../../telemetry/metrics";
import { logger } from "../../observability/logger";

export async function autoClosePullRequestFeature(
  context: PullRequestContext
): Promise<void> {
  const decision = pullRequestPolicy(context.pullRequest);

  if (decision.action === "close") {
    logger.info(
      {
        pr: context.pullRequest.number,
        reason: decision.reason ?? "policy_close",
      },
      "Auto-closing pull request"
    );

    await closePrService({
      octokit: context.octokit,
      owner: context.repository.owner,
      repo: context.repository.repo,
      pullRequestNumber: context.pullRequest.number,
    });

    increment("pr.autoclose.executed");
    return;
  }

  increment("pr.autoclose.skipped", {
    reason: decision.reason ?? "policy_ignore",
  });
}
