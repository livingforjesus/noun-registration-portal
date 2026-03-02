import { randomBytes } from "node:crypto";

import { and, eq, gt } from "drizzle-orm";

import {
  type AuthRequestPasswordResetBody,
  authRequestPasswordResetBodySchema,
  type AuthRequestPasswordResetResponse,
} from "@nexus/api-types/routes/auth";
import { sendEmail } from "@nexus/email";
import { db, staff, staffPasswordResets } from "@nexus/db";

import type { TypedRequestHandler } from "../../types/request-handler";
import { parseBody } from "../../utils/parse-body";

export const requestPasswordReset: TypedRequestHandler<
  AuthRequestPasswordResetResponse,
  AuthRequestPasswordResetBody
> = async (req, res) => {
  const { id } = parseBody(authRequestPasswordResetBodySchema, req.body);

  const staffRecord = await db.query.staff.findFirst({
    where: eq(staff.id, id),
  });

  if (!staffRecord) {
    res.json({
      ok: true,
      message: "If this staff account exists, a reset token has been sent.",
    });
    return;
  }

  const existingToken = await db.query.staffPasswordResets.findFirst({
    where: and(
      eq(staffPasswordResets.staffId, id),
      eq(staffPasswordResets.used, false),
      gt(staffPasswordResets.expiresAt, new Date())
    ),
  });

  const token =
    existingToken?.token ?? randomBytes(3).toString("hex").toUpperCase();

  if (!existingToken) {
    await db.insert(staffPasswordResets).values({
      staffId: id,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 15),
    });
  }

  await sendEmail({
    to: staffRecord.email,
    subject: "Staff password reset token",
    body: `Your password reset token is ${token}`,
  });

  res.json({
    ok: true,
    message: "If this staff account exists, a reset token has been sent.",
  });
};
