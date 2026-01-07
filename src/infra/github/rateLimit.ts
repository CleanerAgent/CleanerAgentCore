import type { Octokit } from "@octokit/rest";
import { logger } from "../../observability";

export function logRateLimit(octokit: Octokit) {
  octokit.hook.after("request", async (response) => {
    const remaining = response.headers["x-ratelimit-remaining"];
    const limit = response.headers["x-ratelimit-limit"];

    logger.debug(
      {
        remaining,
        limit,
      },
      "GitHub API rate limit"
    );
  });
}
