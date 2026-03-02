import type { StaffRole } from "@nexus/api-types/routes/auth";
import { Routes } from "@/lib/routes";

interface StaffTopNavConfigItem {
  text: string;
  href: string;
  roles: StaffRole[];
}

interface StaffSidebarConfigItem {
  text: string;
  href: string;
}

export const staffTopNavConfig: StaffTopNavConfigItem[] = [
  {
    text: "Faculty",
    href: Routes.STAFF_DASHBOARD_FACULTY,
    roles: ["faculty"],
  },
  {
    text: "Registry",
    href: Routes.STAFF_DASHBOARD_REGISTRY,
    roles: ["faculty"],
  },
];

export type { StaffSidebarConfigItem, StaffTopNavConfigItem };
