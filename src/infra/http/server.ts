import express, { type Application, type Request, type Response } from "express";
import http from "node:http";
import process from "node:process";

import { logger } from "../../observability";

export interface HttpServerRuntime {
  app: Application;
  server?: http.Server;
}

export function createHttpServer(
  webhookHandler: (req: Request, res: Response) => Promise<void>
): HttpServerRuntime {
  const app = express();

  // ─────────────────────────────────────────────
  // GitHub Webhook endpoint (RAW BODY)
  // ─────────────────────────────────────────────
  app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
      try {
        await webhookHandler(req, res);
      } catch (error) {
        logger.error(error, "Unhandled webhook error");
        res.status(500).end("Internal Server Error");
      }
    }
  );

  // ─────────────────────────────────────────────
  // Global middlewares (AFTER webhook)
  // ─────────────────────────────────────────────
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));

  // ─────────────────────────────────────────────
  // Health check
  // ─────────────────────────────────────────────
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "cleaner-agent-core",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  return { app };
}
