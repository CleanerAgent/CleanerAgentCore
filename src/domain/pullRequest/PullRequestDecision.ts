export type PullRequestDecision =
  | {
      action: "ignore";
      reason?: string;
    }
  | {
      action: "comment";
      comment: string;
      reason?: string;
    }
  | {
      action: "label";
      labels: string[];
      reason?: string;
    }
  | {
      action: "close";
      reason: string;
    };
