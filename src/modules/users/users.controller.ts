import { Request, Response } from 'express';
import { usersService, UsersService } from './users.service.js';
import { ResponseFormatter } from '../../utils/api-response.js';

export class UsersController {
  constructor(private service: UsersService = usersService) {}

  getProfile = async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      ResponseFormatter.error(res, 'User not authenticated', 'Unauthorized', 401);
      return;
    }
    const user = await this.service.getUserById(req.user.id);
    if (!user) {
      ResponseFormatter.error(res, 'User not found', 'Not Found', 404);
      return;
    }
    ResponseFormatter.success(res, user, 'User profile retrieved');
  };

  listAll = async (req: Request, res: Response): Promise<void> => {
    const users = await this.service.getAllUsers();
    ResponseFormatter.success(res, users, 'Users list retrieved');
  };
}

export const usersController = new UsersController();
