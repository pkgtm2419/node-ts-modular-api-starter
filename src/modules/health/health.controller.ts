import { Request, Response } from 'express';
import { ResponseFormatter } from '../../utils/api-response.js';

export class HealthController {
  static getHealth(req: Request, res: Response): void {
    const healthStatus = {
      status: 'UP',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      memoryUsage: process.memoryUsage()
    };
    ResponseFormatter.success(res, healthStatus, 'Service is healthy');
  }
}
