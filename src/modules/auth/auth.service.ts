import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersRepository, UsersRepository } from '../users/users.repository.js';
import { RegisterInput, LoginInput } from './auth.schema.js';
import { ENV } from '../../config/env.js';

export class AuthService {
  constructor(private repo: UsersRepository = usersRepository) {}

  async register(input: RegisterInput): Promise<{ user: any; token: string }> {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) {
      throw new Error('Email is already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(input.password, salt);

    const user = await this.repo.create({
      name: input.name,
      email: input.email,
      passwordHash,
      role: input.role || 'user'
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { passwordHash: _, ...sanitized } = user;
    return { user: sanitized, token };
  }

  async login(input: LoginInput): Promise<{ user: any; token: string }> {
    const user = await this.repo.findByEmail(input.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      ENV.JWT_SECRET,
      { expiresIn: '1d' }
    );

    const { passwordHash: _, ...sanitized } = user;
    return { user: sanitized, token };
  }
}

export const authService = new AuthService();
