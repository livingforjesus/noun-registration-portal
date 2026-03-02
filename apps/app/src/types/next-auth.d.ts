import type { StaffRole } from "@nexus/api-types/routes/auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
  }

  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: StaffRole[];
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    roles?: StaffRole[];
    accessToken?: string;
  }
}
