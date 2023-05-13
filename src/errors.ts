import { NextFunction, Request, Response } from 'express';

export default function errors(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response<any, Record<string, any>> {
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
}