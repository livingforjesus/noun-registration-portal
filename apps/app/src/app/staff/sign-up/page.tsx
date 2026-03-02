import { type FC } from "react";

import { StaffAuthShell } from "@/app/staff/_components/staff-auth-shell";
import { StaffSignUpForm } from "@/app/staff/sign-up/_components/staff-sign-up-form";

const StaffSignUpPage: FC = () => {
  return (
    <StaffAuthShell title="Staff Sign-up Page">
      <StaffSignUpForm />
    </StaffAuthShell>
  );
};

export default StaffSignUpPage;
