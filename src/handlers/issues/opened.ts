import type { EmitterWebhookEvent } from "@octokit/webhooks";
import { logger } from "../../observability/logger";

import { autoCloseIssueFeature } from "../../features/autoClose/autoClose.issue";
import { autoLabelIssueFeature } from "../../features/autoLabel/autoLabel";

import { getInstallationOctokit } from "../../app/githubApp";
import { mapGitHubIssueToDomain } from "../../infra/github/mappers/issue.mapper";

import type { IssueContext } from "../../domain/issue/IssueContext";
import type { RestOctokit } from "../../infra/github/octokit.client";

export async function onIssueOpened(
  event: EmitterWebhookEvent<"issues.opened">
): Promise<void> {
  const { issue, repository, installation } = event.payload;

  if (!installation?.id) {
    logger.warn(
      { repo: repository.full_name },
      "Issue opened event without installation context"
    );
    return;
  }

  logger.info(
    {
      repo: repository.full_name,
      issue: issue.number,
    },
    "Issue opened"
  );

  try {
    const octokit = (await getInstallationOctokit(
      installation.id
    )) as RestOctokit;

    const domainIssue = mapGitHubIssueToDomain(issue);

    const context: IssueContext = {
      issue: domainIssue,
      repository: {
        owner: repository.owner.login,
        repo: repository.name,
      },
      installationId: installation.id,
      octokit,
    };

    await autoCloseIssueFeature(context);
    await autoLabelIssueFeature(context, []);
  } catch (error) {
    logger.error(
      {
        err: error,
        repo: repository.full_name,
        issue: issue.number,
      },
      "Failed to handle issue opened event"
    );
  }
}
