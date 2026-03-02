import { redirect } from "next/navigation";
import { type FC } from "react";

import { Routes } from "@/lib/routes";

const RegistryPage: FC = () => {
  redirect(Routes.STAFF_DASHBOARD_REGISTRY_SUBITEM_1);
  return null;
};

export default RegistryPage;
