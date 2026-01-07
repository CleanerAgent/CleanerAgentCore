export type IssueDecision =
  | {
      action: "ignore";
    }
  | {
      action: "close";
      reason: string;
    }
  | {
      action: "comment";
      comment: string;
    }
  | {
      action: "label";
      labels: string[];
    };
