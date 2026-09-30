import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../src/app.js';
import { ENV } from '../src/config/env.js';

describe('RBAC & Route Protection', () => {
  const adminToken = jwt.sign({ id: 'usr_admin', email: 'admin@test.com', role: 'admin' }, ENV.JWT_SECRET);
  const userToken = jwt.sign({ id: 'usr_normal', email: 'user@test.com', role: 'user' }, ENV.JWT_SECRET);

  it('GET /api/v1/users/me should reject requests without token with 401', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/users (Admin-only) should reject normal user with 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(403);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/users (Admin-only) should allow admin token with 200 OK', async () => {
    const res = await request(app)
      .get('/api/v1/users')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
