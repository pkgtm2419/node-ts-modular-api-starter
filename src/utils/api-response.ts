import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | any;
  timestamp: string;
}

export class ResponseFormatter {
  static success<T>(res: Response, data: T, message = 'Success', statusCode = 200): Response {
    const payload: ApiResponse<T> = {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(payload);
  }

  static error(res: Response, error: string | any, message = 'An error occurred', statusCode = 500): Response {
    const payload: ApiResponse = {
      success: false,
      message,
      error,
      timestamp: new Date().toISOString()
    };
    return res.status(statusCode).json(payload);
  }
}
