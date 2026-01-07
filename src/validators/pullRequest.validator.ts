import { z } from "zod";

export const PullRequestSchema = z.object({
  title: z.string().min(1),
  number: z.number(),
  merged: z.boolean().optional(),
});

export type ValidatedPullRequest = z.infer<typeof PullRequestSchema>;
