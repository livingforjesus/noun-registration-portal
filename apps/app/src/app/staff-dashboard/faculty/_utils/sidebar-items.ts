import { type StaffSidebarConfigItem } from "@/app/staff-dashboard/_utils/staff-navigation-config";
import { Routes } from "@/lib/routes";

export const facultySidebarItems: StaffSidebarConfigItem[] = [
  {
    text: "Faculty Subitem 1",
    href: Routes.STAFF_DASHBOARD_FACULTY_SUBITEM_1,
  },
  {
    text: "Faculty Subitem 2",
    href: Routes.STAFF_DASHBOARD_FACULTY_SUBITEM_2,
  },
];
