import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { ResponseFormatter } from '../utils/api-response.js';

export interface AuthUser {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticateJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ResponseFormatter.error(res, 'Authorization token missing or malformed', 'Unauthorized', 401);
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as AuthUser;
    req.user = decoded;
    next();
  } catch (err) {
    ResponseFormatter.error(res, 'Token is invalid or expired', 'Unauthorized', 401);
  }
};
