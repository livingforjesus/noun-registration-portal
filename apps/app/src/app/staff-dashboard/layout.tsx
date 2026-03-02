import { redirect } from "next/navigation";
import { type FC } from "react";

import { auth } from "@/app/api/auth/[...nextauth]/auth";
import { StaffDashboardShell } from "@/app/staff-dashboard/_components/staff-dashboard-shell";
import { staffTopNavConfig } from "@/app/staff-dashboard/_utils/staff-navigation-config";
import { Routes } from "@/lib/routes";

interface StaffDashboardLayoutProps {
  children: React.ReactNode;
}

const StaffDashboardLayout: FC<StaffDashboardLayoutProps> = async ({
  children,
}) => {
  const session = await auth();

  if (!session?.user) {
    redirect(Routes.STAFF);
  }

  console.log(session.user);
  const visibleTopNavItems = staffTopNavConfig.filter((item) =>
    item.roles.some((role) => session.user?.roles.includes(role))
  );

  if (visibleTopNavItems.length === 0) {
    redirect(Routes.STAFF);
  }

  const fullName = `${session.user.firstName} ${session.user.lastName}`;

  return (
    <StaffDashboardShell
      fullName={fullName}
      staffId={session.user.id}
      topNavItems={visibleTopNavItems}
    >
      {children}
    </StaffDashboardShell>
  );
};

export default StaffDashboardLayout;
