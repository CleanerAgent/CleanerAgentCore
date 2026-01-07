import type { Webhooks } from "@octokit/webhooks";

import { onIssueOpened } from "./opened";
import { onIssueEdited } from "./edited";
import { onIssueClosed } from "./closed";

export function registerIssueHandlers(webhooks: Webhooks): void {
  webhooks.on("issues.opened", onIssueOpened);
  webhooks.on("issues.edited", onIssueEdited);
  webhooks.on("issues.closed", onIssueClosed);
}
