import { Webhooks } from "@octokit/webhooks";
import type { Request, Response } from "express";

import { config } from "../config";
import { logger } from "../observability/logger";
import { registerAllHandlers } from "../handlers/registerHandlers";

const webhooks = new Webhooks({
  secret: config.WEBHOOK_SECRET,
});

registerAllHandlers(webhooks);

export async function handleWebhookRequest(
  req: Request,
  res: Response
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).end("Method Not Allowed");
    return;
  }

  const event = req.headers["x-github-event"];
  const delivery = req.headers["x-github-delivery"];
  const signature = req.headers["x-hub-signature-256"];

  if (!event || !delivery || !signature) {
    logger.warn("Invalid webhook headers");
    res.status(400).end("Invalid webhook request");
    return;
  }

  try {
    // 🔴 AQUI É O FIX PRINCIPAL
    const payload =
      Buffer.isBuffer(req.body)
        ? JSON.parse(req.body.toString("utf-8"))
        : req.body;

    await webhooks.verifyAndReceive({
      id: String(delivery),
      name: String(event),
      signature: String(signature),
      payload,
    });

    res.status(200).end("OK");
  } catch (error) {
    logger.error(error, "Webhook handling failed");
    res.status(400).end("Webhook error");
  }
}

export function getWebhooks() {
  return webhooks;
}
