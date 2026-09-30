import request from 'supertest';
import { app } from '../src/app.js';

describe('Auth API (Register & Login)', () => {
  const testUser = {
    name: 'Test Engineer',
    email: `engineer_${Date.now()}@example.com`,
    password: 'Password123!',
    role: 'user'
  };

  it('POST /api/v1/auth/register should create a user and return JWT', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user.email).toBe(testUser.email);
    expect(res.body.data.user).not.toHaveProperty('passwordHash');
  });

  it('POST /api/v1/auth/login should authenticate user with correct credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
  });

  it('POST /api/v1/auth/login should reject invalid credentials with 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: testUser.email,
        password: 'WrongPassword'
      });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
