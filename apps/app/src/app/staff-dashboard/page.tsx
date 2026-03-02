import { redirect } from "next/navigation";
import { type FC } from "react";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { staffTopNavConfig } from "@/app/staff-dashboard/_utils/staff-navigation-config";
import { Routes } from "@/lib/routes";

const StaffDashboardPage: FC = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect(Routes.STAFF);
  }

  const firstAllowedSection = staffTopNavConfig.find((item) =>
    item.roles.some((role) => session.user?.roles.includes(role))
  );

  console.log(session);
  if (firstAllowedSection) {
    redirect(firstAllowedSection.href);
  }
  return null;
};

export default StaffDashboardPage;
