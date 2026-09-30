import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { ENV } from './config/env.js';
import { swaggerDocument } from './config/swagger.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { healthRoutes } from './modules/health/health.routes.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { usersRoutes } from './modules/users/users.routes.js';

export function createApp(): Application {
  const app = express();

  // Security & Core Middlewares
  app.use(helmet());
  app.use(cors({ origin: ENV.CORS_ORIGIN }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  if (ENV.NODE_ENV !== 'test') {
    app.use(morgan('dev'));
  }

  // Swagger Documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Module Routes
  app.use('/api/v1/health', healthRoutes);
  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/users', usersRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
