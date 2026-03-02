import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import {
  type AuthActivateAccountBody,
  authActivateAccountBodySchema,
  type AuthActivateAccountResponse,
} from "@nexus/api-types/routes/auth";
import { db, staff } from "@nexus/db";

import { ApiError } from "../../errors/api-error";
import type { TypedRequestHandler } from "../../types/request-handler";
import { parseBody } from "../../utils/parse-body";

export const activateAccount: TypedRequestHandler<
  AuthActivateAccountResponse,
  AuthActivateAccountBody
> = async (req, res) => {
  const { id, password } = parseBody(authActivateAccountBodySchema, req.body);

  const staffRecord = await db.query.staff.findFirst({
    where: eq(staff.id, id),
  });

  if (!staffRecord) {
    throw new ApiError(404, "Staff record not found");
  }

  const hashedPassword = await hash(password, 10);

  await db
    .update(staff)
    .set({
      password: hashedPassword,
      updatedAt: new Date(),
    })
    .where(eq(staff.id, id));

  res.json({
    ok: true,
    message: "Staff account activated",
  });
};
