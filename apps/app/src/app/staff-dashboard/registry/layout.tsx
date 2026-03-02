import { type FC } from "react";

import { SectionSidebarLayout } from "@/app/staff-dashboard/_components/section-sidebar-layout";
import { registrySidebarItems } from "@/app/staff-dashboard/registry/_utils/sidebar-items";

interface RegistryLayoutProps {
  children: React.ReactNode;
}

const RegistryLayout: FC<RegistryLayoutProps> = ({ children }) => {
  return (
    <SectionSidebarLayout title="Registry" items={registrySidebarItems}>
      {children}
    </SectionSidebarLayout>
  );
};

export default RegistryLayout;
