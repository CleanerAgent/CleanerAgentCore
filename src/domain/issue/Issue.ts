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

  labels: string[];

  createdAt: string;
  updatedAt: string;

  isPullRequest: boolean;
}
