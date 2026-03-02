import { redirect } from "next/navigation";
import { type FC } from "react";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { StaffAuthShell } from "@/app/staff/_components/staff-auth-shell";
import { StaffLoginForm } from "@/app/staff/_components/staff-login-form";
import { Routes } from "@/lib/routes";

const StaffPage: FC = async () => {
  const session = await auth();
  if (session?.user) {
    redirect(Routes.STAFF_DASHBOARD);
  }

  return (
    <StaffAuthShell title="Staff Login Page">
      <StaffLoginForm defaultStaffId="00001" />
    </StaffAuthShell>
  );
};

export default StaffPage;
