import { createSelectSchema } from "drizzle-zod";

import { staff, staffPasswordResets } from "@nexus/db/schema";

const staffSchema = createSelectSchema(staff);
const staffPasswordResetSchema = createSelectSchema(staffPasswordResets);

const staffIdSchema = staffSchema.pick({ id: true });
const staffCredentialsSchema = staffSchema.pick({ id: true, password: true });
const staffResetTokenSchema = staffPasswordResetSchema.pick({ token: true });
export type StaffRole = (typeof staff.$inferSelect.roles)[number];

export const authLoginBodySchema = staffCredentialsSchema;

export type AuthLoginBody = Pick<typeof staff.$inferSelect, "id" | "password">;

export interface AuthLoginResponse {
  accessToken: string;
  staff: Pick<
    typeof staff.$inferSelect,
    "id" | "email" | "firstName" | "lastName" | "roles"
  >;
}

export const authActivateAccountBodySchema = staffCredentialsSchema;

export type AuthActivateAccountBody = Pick<
  typeof staff.$inferSelect,
  "id" | "password"
>;

export interface AuthActivateAccountResponse {
  ok: true;
  message: string;
}

export const authRequestPasswordResetBodySchema = staffIdSchema;

export type AuthRequestPasswordResetBody = Pick<
  typeof staff.$inferSelect,
  "id"
>;

export interface AuthRequestPasswordResetResponse {
  ok: true;
  message: string;
}

export const authResetPasswordBodySchema = staffCredentialsSchema.extend(
  staffResetTokenSchema.shape
);

export type AuthResetPasswordBody = Pick<
  typeof staff.$inferSelect,
  "id" | "password"
> &
  Pick<typeof staffPasswordResets.$inferSelect, "token">;

export interface AuthResetPasswordResponse {
  ok: true;
  message: string;
}

export interface AuthMeResponse {
  staff: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: StaffRole[];
  };
}
