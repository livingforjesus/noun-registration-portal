import { hash } from "bcryptjs";
import { and, eq, gt } from "drizzle-orm";

import {
  type AuthResetPasswordBody,
  authResetPasswordBodySchema,
  type AuthResetPasswordResponse,
} from "@nexus/api-types/routes/auth";
import { db, staff, staffPasswordResets } from "@nexus/db";

import { ApiError } from "../../errors/api-error";
import type { TypedRequestHandler } from "../../types/request-handler";
import { parseBody } from "../../utils/parse-body";

export const resetPassword: TypedRequestHandler<
  AuthResetPasswordResponse,
  AuthResetPasswordBody
> = async (req, res) => {
  const { id, token, password } = parseBody(
    authResetPasswordBodySchema,
    req.body
  );

  const resetTokenRecord = await db.query.staffPasswordResets.findFirst({
    where: and(
      eq(staffPasswordResets.staffId, id),
      eq(staffPasswordResets.token, token.toUpperCase()),
      eq(staffPasswordResets.used, false),
      gt(staffPasswordResets.expiresAt, new Date())
    ),
  });

  if (!resetTokenRecord) {
    throw new ApiError(400, "Invalid or expired reset token");
  }

  const hashedPassword = await hash(password, 10);

  await db.transaction(async (tx) => {
    await Promise.all([
      tx
        .update(staff)
        .set({
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(staff.id, id))
        .execute(),
      tx
        .update(staffPasswordResets)
        .set({ used: true })
        .where(eq(staffPasswordResets.id, resetTokenRecord.id))
        .execute(),
    ]);
  });

  res.json({
    ok: true,
    message: "Password reset successful",
  });
};
