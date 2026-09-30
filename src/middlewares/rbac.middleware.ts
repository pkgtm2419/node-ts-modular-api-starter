import { Request, Response, NextFunction } from 'express';
import { ResponseFormatter } from '../utils/api-response.js';

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ResponseFormatter.error(res, 'User identity not found in request', 'Unauthorized', 401);
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      ResponseFormatter.error(
        res,
        `Role '${req.user.role}' is not authorized to access this resource`,
        'Forbidden',
        403
      );
      return;
    }

    next();
  };
};
