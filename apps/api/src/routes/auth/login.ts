import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

import {
  type AuthLoginBody,
  authLoginBodySchema,
  type AuthLoginResponse,
} from "@nexus/api-types/routes/auth";
import { db, staff } from "@nexus/db";

import { signAuthToken } from "../../auth/jwt";
import { ApiError } from "../../errors/api-error";
import type { TypedRequestHandler } from "../../types/request-handler";
import { parseBody } from "../../utils/parse-body";

export const login: TypedRequestHandler<
  AuthLoginResponse,
  AuthLoginBody
> = async (req, res) => {
  const { id, password } = parseBody(authLoginBodySchema, req.body);

  const staffRecord = await db.query.staff.findFirst({
    where: eq(staff.id, id),
  });

  if (!staffRecord) {
    throw new ApiError(401, "Invalid staff credentials");
  }

  const isPasswordValid = await compare(password, staffRecord.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid staff credentials");
  }

  const accessToken = signAuthToken({
    userId: staffRecord.id,
    email: staffRecord.email,
    firstName: staffRecord.firstName,
    lastName: staffRecord.lastName,
    roles: staffRecord.roles,
  });

  res.json({
    accessToken,
    staff: {
      id: staffRecord.id,
      email: staffRecord.email,
      firstName: staffRecord.firstName,
      lastName: staffRecord.lastName,
      roles: staffRecord.roles,
    },
  });
};
