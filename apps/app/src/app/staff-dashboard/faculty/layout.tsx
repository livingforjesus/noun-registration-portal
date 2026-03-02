import { type FC } from "react";

import { SectionSidebarLayout } from "@/app/staff-dashboard/_components/section-sidebar-layout";
import { facultySidebarItems } from "@/app/staff-dashboard/faculty/_utils/sidebar-items";

interface FacultyLayoutProps {
  children: React.ReactNode;
}

const FacultyLayout: FC<FacultyLayoutProps> = ({ children }) => {
  return (
    <SectionSidebarLayout title="Faculty" items={facultySidebarItems}>
      {children}
    </SectionSidebarLayout>
  );
};

export default FacultyLayout;
