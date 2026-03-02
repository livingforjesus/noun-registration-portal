import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import {
  authLoginBodySchema,
  type AuthLoginResponse,
} from "@nexus/api-types/routes/auth";

import { loginStaff } from "@/lib/api";
import { Routes } from "@/lib/routes";

console.log(process.env);
export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: Routes.STAFF,
  },
  providers: [
    Credentials({
      credentials: {
        staffId: { label: "Staff ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const parseResult = authLoginBodySchema.safeParse({
          id: credentials.staffId?.toString(),
          password: credentials.password?.toString(),
        });

        if (!parseResult.success) {
          return null;
        }

        const { id, password } = parseResult.data;

        let payload: AuthLoginResponse;
        try {
          payload = await loginStaff({ id, password });
        } catch {
          return null;
        }

        return {
          id: payload.staff.id,
          email: payload.staff.email,
          firstName: payload.staff.firstName,
          lastName: payload.staff.lastName,
          roles: payload.staff.roles,
          accessToken: payload.accessToken as string,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.roles = user.roles;
        token.accessToken = (
          user as unknown as { accessToken: string }
        ).accessToken;
      }

      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user = {
          id: token.sub ?? "",
          email: token.email ?? "",
          firstName: token.firstName ?? "",
          lastName: token.lastName ?? "",
          roles: token.roles ?? [],
        };
      }

      session.accessToken = token.accessToken ?? "";
      return session;
    },
  },
  secret:
    process.env["AUTH_SECRET"] ?? process.env["NEXTAUTH_SECRET"] ?? undefined,
});
