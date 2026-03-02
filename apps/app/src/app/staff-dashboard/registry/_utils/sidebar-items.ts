import { type StaffSidebarConfigItem } from "@/app/staff-dashboard/_utils/staff-navigation-config";
import { Routes } from "@/lib/routes";

export const registrySidebarItems: StaffSidebarConfigItem[] = [
  {
    text: "Registry Subitem 1",
    href: Routes.STAFF_DASHBOARD_REGISTRY_SUBITEM_1,
  },
  {
    text: "Registry Subitem 2",
    href: Routes.STAFF_DASHBOARD_REGISTRY_SUBITEM_2,
  },
];
