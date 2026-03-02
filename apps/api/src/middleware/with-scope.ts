import type { RequestHandler } from "express";

import type { StaffRole } from "@nexus/api-types/routes/auth";

import { ApiError } from "../errors/api-error";

export const withScope = (roles: StaffRole[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.auth) {
      next(new ApiError(401, "Not authenticated"));
      return;
    }

    const hasRequiredRole = roles.some((role) =>
      req.auth?.roles.includes(role)
    );

    if (!hasRequiredRole) {
      next(new ApiError(403, "Insufficient scope"));
      return;
    }

    next();
  };
};
