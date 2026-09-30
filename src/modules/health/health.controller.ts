import { Request, Response } from 'express';
import { ResponseFormatter } from '../../utils/api-response.js';
import { cacheClient } from '../../config/redis.js';

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

  static getLiveness(req: Request, res: Response): void {
    ResponseFormatter.success(
      res,
      {
        status: 'UP',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      },
      'Process is alive'
    );
  }

  static async getReadiness(req: Request, res: Response): Promise<void> {
    try {
      const cacheStatus = await cacheClient.ping();
      const ready = cacheStatus === 'PONG';

      if (ready) {
        ResponseFormatter.success(
          res,
          {
            status: 'READY',
            dependencies: {
              cache: 'UP'
            },
            timestamp: new Date().toISOString()
          },
          'Service is ready to accept traffic'
        );
      } else {
        ResponseFormatter.error(
          res,
          { status: 'DEGRADED', dependencies: { cache: 'DOWN' } },
          'Service degraded',
          503
        );
      }
    } catch (error) {
      ResponseFormatter.error(
        res,
        { status: 'UNHEALTHY', error: (error as Error).message },
        'Service not ready',
        503
      );
    }
  }
}
