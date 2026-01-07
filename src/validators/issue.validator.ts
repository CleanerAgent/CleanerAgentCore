import { z } from "zod";

export const IssueSchema = z.object({
  title: z.string().min(1),
  body: z.string().optional(),
  number: z.number(),
});

export type ValidatedIssue = z.infer<typeof IssueSchema>;
