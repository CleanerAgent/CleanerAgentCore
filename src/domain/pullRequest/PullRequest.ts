// src/domain/pullRequest/PullRequest.ts
export interface PullRequest {
  id: number;
  number: number;

  title: string;
  body?: string;

  state: "open" | "closed" | "merged";

  author: {
    login: string;
    id: number;
  };

  createdAt: string;
  updatedAt: string;

  baseBranch: string;
  headBranch: string;
}
