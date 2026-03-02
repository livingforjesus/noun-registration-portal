import jwt from "jsonwebtoken";

import type { StaffRole } from "@nexus/api-types/routes/auth";

export interface AuthTokenPayload {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: StaffRole[];
}

export const signAuthToken = (payload: AuthTokenPayload): string =>
  jwt.sign(payload, process.env.AUTH_JWT_SECRET!, {
    expiresIn: "12h",
  });

export const verifyAuthToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, process.env.AUTH_JWT_SECRET!);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid auth token payload");
  }

  return decoded as AuthTokenPayload;
};
