// src/types/services.ts
import type { RestOctokit } from "../infra/github/octokit.client";

/**
 * Base context for all services
 * Contains authenticated Octokit and repository reference
 */
export interface ServiceContext {
  octokit: RestOctokit;
  owner: string;
  repo: string;
}

/**
 * Context for issue-related services
 */
export interface IssueServiceContext extends ServiceContext {
  issueNumber: number;
}

/**
 * Context for pull request–related services
 */
export interface PullRequestServiceContext extends ServiceContext {
  pullRequestNumber: number;
}
