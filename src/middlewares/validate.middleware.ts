import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ResponseFormatter } from '../utils/api-response.js';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map(i => ({
          field: i.path.join('.'),
          message: i.message
        }));
        ResponseFormatter.error(res, issues, 'Validation Failed', 400);
        return;
      }
      ResponseFormatter.error(res, error, 'Bad Request', 400);
    }
  };
};
