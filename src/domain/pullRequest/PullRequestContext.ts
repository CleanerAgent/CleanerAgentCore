import type { PullRequest } from "./PullRequest";
import type { RepositoryContext } from "../common/RepositoryContext";
import type { RestOctokit } from "../../infra/github/octokit.client";

export interface PullRequestContext {
  pullRequest: PullRequest;
  repository: RepositoryContext;
  installationId: number;
  octokit: RestOctokit;
}
