import type { RequestHandler } from "express";

export type TypedRequestHandler<
  TResponse,
  TRequestBody = unknown,
> = RequestHandler<Record<string, string>, TResponse, TRequestBody>;
