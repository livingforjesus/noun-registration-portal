import type { NextFunction, Request, RequestHandler, Response } from "express";

export const withAsyncHandler = (
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void | Promise<void>
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
