import type { Issue } from "./Issue";
import type { RepositoryContext } from "../common/RepositoryContext";
import type { RestOctokit } from "../../infra/github/octokit.client";

export interface IssueContext {
  issue: Issue;
  repository: RepositoryContext;
  installationId: number;
  octokit: RestOctokit;
}
