import { app } from './app.js';
import { ENV } from './config/env.js';
import { Logger } from './utils/logger.js';

const server = app.listen(ENV.PORT, () => {
  Logger.info(`🚀 Server running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
  Logger.info(`📚 Swagger documentation available at http://localhost:${ENV.PORT}/api/docs`);
});

const shutdown = (signal: string) => {
  Logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    Logger.info('HTTP server closed.');
    process.exit(0);
  });
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
