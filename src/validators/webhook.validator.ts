import { z } from "zod";

export const WebhookBaseSchema = z.object({
  repository: z.object({
    full_name: z.string(),
  }),
  installation: z.object({
    id: z.number(),
  }),
});
