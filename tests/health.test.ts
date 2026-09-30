import request from 'supertest';
import { app } from '../src/app.js';

describe('Health Check API', () => {
  it('GET /api/v1/health should return 200 with UP status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('UP');
    expect(res.body.data).toHaveProperty('uptime');
    expect(res.body.data).toHaveProperty('nodeVersion');
  });

  it('GET /api/v1/health/live should return 200 with UP status and uptime', async () => {
    const res = await request(app).get('/api/v1/health/live');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('UP');
    expect(res.body.data).toHaveProperty('uptime');
  });

  it('GET /api/v1/health/ready should return 200 when cache is ready', async () => {
    const res = await request(app).get('/api/v1/health/ready');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.status).toBe('READY');
    expect(res.body.data.dependencies.cache).toBe('UP');
  });
});
