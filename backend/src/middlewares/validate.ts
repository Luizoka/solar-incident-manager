import { NextFunction, Request, Response } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

export function validateBody(schema: ZodTypeAny) {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      request.body = schema.parse(request.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function validateQuery(schema: ZodTypeAny) {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      request.query = schema.parse(request.query) as Request['query'];
      next();
    } catch (error) {
      next(error);
    }
  };
}

export function formatZodError(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message
  }));
}
