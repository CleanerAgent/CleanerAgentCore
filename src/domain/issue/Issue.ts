// src/domain/issue/Issue.ts
export interface Issue {
  id: number;
  number: number;

  title: string;
  body?: string;

  state: "open" | "closed";

  author: {
    login: string;
    id: number;
  };

  createdAt: string;
  updatedAt: string;

  isPullRequest: boolean;
}
