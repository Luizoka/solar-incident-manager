import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { logger } from '../logs/logger';
import { formatZodError } from './validate';
import { HttpError } from '../utils/httpError';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  _next: NextFunction
) {
  if (error instanceof ZodError) {
    logger.error(`Validation error - ${request.method} ${request.originalUrl}`);
    return response.status(400).json({
      message: 'Validation error',
      errors: formatZodError(error)
    });
  }

  if (error instanceof HttpError) {
    logger.error(`${error.message} - ${request.method} ${request.originalUrl}`);
    return response.status(error.statusCode).json({ message: error.message });
  }

  logger.error(`Internal server error - ${request.method} ${request.originalUrl}`, error);
  return response.status(500).json({ message: 'Internal server error' });
}
