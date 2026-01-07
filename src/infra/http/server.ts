import express, { type Application, type Request, type Response } from "express";
import http from "node:http";
import process from "node:process";

import { logger } from "../../observability";

/**
 * HTTP server runtime
 */
export interface HttpServerRuntime {
  app: Application;
  server?: http.Server;
}

/**
 * Create HTTP server
 */
export function createHttpServer(
  webhookHandler: (req: Request, res: Response) => Promise<void>
): HttpServerRuntime {
  const app = express();

  // ─────────────────────────────────────────────
  // Global middlewares
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

  // ─────────────────────────────────────────────
  // GitHub Webhook endpoint
  // ─────────────────────────────────────────────
  app.post("/webhook", async (req, res) => {
    await webhookHandler(req, res);
  });

  return { app };
}

/**
 * Start HTTP server
 */
export function startHttpServer(
  runtime: HttpServerRuntime,
  port: number
) {
  const server = http.createServer(runtime.app);

  server.listen(port, () => {
    logger.info(`HTTP server running on port ${port}`);
  });

  runtime.server = server;
}

/**
 * Graceful shutdown
 */
export function setupGracefulShutdown(runtime: HttpServerRuntime) {
  const shutdown = (signal: string) => {
    logger.warn(`Received ${signal}, shutting down HTTP server`);

    if (!runtime.server) {
      process.exit(0);
    }

    runtime.server.close(() => {
      logger.info("HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}
