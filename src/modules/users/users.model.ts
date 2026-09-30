export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'admin' | 'user' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
