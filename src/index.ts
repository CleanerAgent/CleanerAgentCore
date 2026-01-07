import { createHttpServer, startHttpServer, setupGracefulShutdown } from "./infra/http/server";
import { handleWebhookRequest } from "./app/webhookServer";
import { logger } from "./observability";

const PORT = Number(process.env.PORT ?? 3000);

async function bootstrap() {
  const runtime = createHttpServer(handleWebhookRequest);

  startHttpServer(runtime, PORT);
  setupGracefulShutdown(runtime);

  logger.info(`CleanerAgentCore started on port ${PORT}`);
}

bootstrap().catch((error) => {
  logger.error(error, "Failed to start CleanerAgentCore");
  process.exit(1);
});
