import { Webhooks } from "@octokit/webhooks";
import type { IncomingMessage, ServerResponse } from "node:http";

import { config } from "../config";
import { logger } from "../observability/logger";
import { registerAllHandlers } from "../handlers/registerHandlers";

/**
 * GitHub Webhooks instance
 */
const webhooks = new Webhooks({
  secret: config.WEBHOOK_SECRET,
});

/**
 * Register all event handlers
 */
registerAllHandlers(webhooks);

/**
 * Handle raw webhook HTTP requests
 * (framework-agnostic)
 */
export async function handleWebhookRequest(
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.end("Method Not Allowed");
    return;
  }

  const event = req.headers["x-github-event"];
  const delivery = req.headers["x-github-delivery"];
  const signature = req.headers["x-hub-signature-256"];

  if (!event || !delivery || !signature) {
    logger.warn("Invalid webhook headers");
    res.statusCode = 400;
    res.end("Invalid webhook request");
    return;
  }

  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      await webhooks.verifyAndReceive({
        id: String(delivery),
        name: String(event),
        signature: String(signature),
        payload: JSON.parse(body),
      });

      res.statusCode = 200;
      res.end("OK");
    } catch (error) {
      logger.error(error, "Webhook handling failed");
      res.statusCode = 400;
      res.end("Webhook error");
    }
  });
}

/**
 * Expose webhooks instance (tests / extensions)
 */
export function getWebhooks() {
  return webhooks;
}
