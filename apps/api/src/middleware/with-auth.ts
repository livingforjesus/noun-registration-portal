import type { RequestHandler } from "express";

import { verifyAuthToken } from "../auth/jwt";
import { ApiError } from "../errors/api-error";

interface WithAuthOptions {
  publicEndpoints?: string[];
}

export const withAuth = (options?: WithAuthOptions): RequestHandler => {
  const publicEndpoints = options?.publicEndpoints ?? [];

  return (req, _res, next) => {
    if (publicEndpoints.includes(req.path)) {
      next();
      return;
    }

    const authorization = req.headers.authorization;
    if (!authorization) {
      next(new ApiError(401, "Authorization header is required"));
      return;
    }

    const [scheme, token] = authorization.split(" ");
    if (scheme !== "Bearer" || !token) {
      next(new ApiError(401, "Authorization must be a Bearer token"));
      return;
    }

    try {
      const authPayload = verifyAuthToken(token);
      req.auth = authPayload;
      next();
    } catch {
      next(new ApiError(401, "Invalid or expired auth token"));
    }
  };
};
