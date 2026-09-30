import { usersRepository, UsersRepository } from './users.repository.js';
import { User } from './users.model.js';
import { cacheClient } from '../../config/redis.js';

export class UsersService {
  constructor(private repo: UsersRepository = usersRepository) {}

  async getUserById(id: string): Promise<Omit<User, 'passwordHash'> | null> {
    const cacheKey = `user:${id}`;
    const cached = await cacheClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const user = await this.repo.findById(id);
    if (!user) return null;

    const { passwordHash, ...sanitized } = user;
    await cacheClient.set(cacheKey, JSON.stringify(sanitized), 'EX', 300);
    return sanitized;
  }

  async getAllUsers(): Promise<Omit<User, 'passwordHash'>[]> {
    const users = await this.repo.findAll();
    return users.map(({ passwordHash, ...sanitized }) => sanitized);
  }
}

export const usersService = new UsersService();
