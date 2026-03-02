import { redirect } from "next/navigation";
import { type FC } from "react";

import { Routes } from "@/lib/routes";

const FacultyPage: FC = () => {
  redirect(Routes.STAFF_DASHBOARD_FACULTY_SUBITEM_1);
  return null;
};

export default FacultyPage;
