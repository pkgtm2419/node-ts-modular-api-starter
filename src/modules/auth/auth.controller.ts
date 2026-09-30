import { Request, Response } from 'express';
import { authService, AuthService } from './auth.service.js';
import { ResponseFormatter } from '../../utils/api-response.js';

export class AuthController {
  constructor(private service: AuthService = authService) {}

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.register(req.body);
      ResponseFormatter.success(res, result, 'User registered successfully', 201);
    } catch (err: any) {
      ResponseFormatter.error(res, err.message, 'Registration Failed', 400);
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.service.login(req.body);
      ResponseFormatter.success(res, result, 'Login successful', 200);
    } catch (err: any) {
      ResponseFormatter.error(res, err.message, 'Authentication Failed', 401);
    }
  };
}

export const authController = new AuthController();
