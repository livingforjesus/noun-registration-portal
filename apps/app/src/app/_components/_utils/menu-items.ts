import {
  ChevronDown,
  CircleHelp,
  CirclePlay,
  GraduationCap,
  HandHelping,
  IdCard,
  School,
  ShieldCheck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Routes, type InternalRoute } from "@/lib/routes";

type BaseMenuItem = {
  text: string;
  icon: LucideIcon;
};

type MenuLeafItem = BaseMenuItem & {
  url: InternalRoute;
  subitems?: never;
};

type MenuBranchItem = BaseMenuItem & {
  url?: never;
  subitems: Array<{ text: string; icon: LucideIcon; url: InternalRoute }>;
};

export type HomeMenuItem = MenuLeafItem | MenuBranchItem;

export const homeMenu: HomeMenuItem[] = [
  {
    text: "How to do things",
    icon: CircleHelp,
    url: Routes.HOW_TO_DO_THINGS,
  },
  {
    text: "Admission",
    icon: GraduationCap,
    subitems: [
      {
        text: "Am I qualified",
        icon: CircleHelp,
        url: Routes.ADMISSION_AM_I_QUALIFIED,
      },
      {
        text: "Apply for admission",
        icon: School,
        url: Routes.ADMISSION_APPLY_FOR_ADMISSION,
      },
      {
        text: "Conclude hanging payment",
        icon: CirclePlay,
        url: Routes.ADMISSION_CONCLUDE_HANGING_PAYMENT,
      },
      {
        text: "Return to application form",
        icon: CirclePlay,
        url: Routes.ADMISSION_RETURN_TO_APPLICATION_FORM,
      },
    ],
  },
  {
    text: "Fresh student",
    icon: UserRound,
    url: Routes.FRESH_STUDENT,
  },
  {
    text: "Registered student",
    icon: IdCard,
    url: Routes.REGISTERED_STUDENT,
  },
  {
    text: "Convocation",
    icon: ShieldCheck,
    url: Routes.CONVOCATION,
  },
  {
    text: "Support",
    icon: HandHelping,
    url: Routes.SUPPORT,
  },
  {
    text: "Staff",
    icon: Users,
    url: Routes.STAFF,
  },
];

export const admissionToggleIcon = ChevronDown;
