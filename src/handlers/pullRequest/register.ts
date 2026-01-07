import type { Webhooks } from "@octokit/webhooks";

import { onPullRequestOpened } from "./opened";
import { onPullRequestClosed } from "./closed";
import { onPullRequestSynchronize } from "./synchronize";
import { onPullRequestMerged } from "./merged";

export function registerPullRequestHandlers(
  webhooks: Webhooks
): void {
  webhooks.on("pull_request.opened", onPullRequestOpened);

  webhooks.on("pull_request.closed", async (event) => {
    await onPullRequestClosed(event);
    await onPullRequestMerged(event);
  });

  webhooks.on(
    "pull_request.synchronize",
    onPullRequestSynchronize
  );
}
