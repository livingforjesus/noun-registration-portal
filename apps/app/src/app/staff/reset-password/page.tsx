import { type FC } from "react";

import { StaffAuthShell } from "@/app/staff/_components/staff-auth-shell";
import { StaffResetPasswordForm } from "@/app/staff/reset-password/_components/staff-reset-password-form";

const StaffResetPasswordPage: FC = () => {
  return (
    <StaffAuthShell title="Reset password">
      <StaffResetPasswordForm />
    </StaffAuthShell>
  );
};

export default StaffResetPasswordPage;
