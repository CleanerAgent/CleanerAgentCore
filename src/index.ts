import express, { type Application } from "express";
import http from "node:http";
import process from "node:process";

import { config } from "./config.js";

/**
 * Application state
 */
interface Runtime {
  app: Application;
  server?: http.Server;
}

const runtime: Runtime = {
  app: express(),
};

/**
 * Global middlewares
 */
function setupMiddlewares(app: Application) {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
}

/**
 * Health & meta routes
 */
function setupRoutes(app: Application) {
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      service: "cleaner-agent-core",
      env: config.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });
}

/**
 * HTTP server bootstrap
 */
function startHttpServer(runtime: Runtime) {
  const server = http.createServer(runtime.app);

  server.listen(config.PORT, () => {
    console.log(
      `🚀 Cleaner Agent Core running on port ${config.PORT} (${config.NODE_ENV})`
    );
  });

  runtime.server = server;
}

/**
 * Graceful shutdown
 */
function setupGracefulShutdown(runtime: Runtime) {
  const shutdown = (signal: string) => {
    console.log(`⚠️  Received ${signal}. Shutting down...`);

    if (runtime.server) {
      runtime.server.close(() => {
        console.log("✅ HTTP server closed");
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

/**
 * Application bootstrap
 */
function bootstrap() {
  setupMiddlewares(runtime.app);
  setupRoutes(runtime.app);

  startHttpServer(runtime);
  setupGracefulShutdown(runtime);
}

/**
 * Start
 */
bootstrap();
