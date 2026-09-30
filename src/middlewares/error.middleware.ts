import { Request, Response, NextFunction } from 'express';
import { ResponseFormatter } from '../utils/api-response.js';
import { Logger } from '../utils/logger.js';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  Logger.error('Unhandled Application Error:', err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  ResponseFormatter.error(res, process.env.NODE_ENV === 'production' ? undefined : err.stack, message, status);
};
