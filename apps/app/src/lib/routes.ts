export const Routes = {
  HOME: "/",
  HOW_TO_DO_THINGS: "/how-to-do-things",
  ADMISSION: "/admission",
  ADMISSION_AM_I_QUALIFIED: "/admission/am-i-qualified",
  ADMISSION_APPLY_FOR_ADMISSION: "/admission/apply-for-admission",
  ADMISSION_CONCLUDE_HANGING_PAYMENT: "/admission/conclude-hanging-payment",
  ADMISSION_RETURN_TO_APPLICATION_FORM: "/admission/return-to-application-form",
  FRESH_STUDENT: "/fresh-student",
  REGISTERED_STUDENT: "/registered-student",
  CONVOCATION: "/convocation",
  SUPPORT: "/support",
  STAFF: "/staff",
  STAFF_SIGN_UP: "/staff/sign-up",
  STAFF_RESET_PASSWORD: "/staff/reset-password",
  STAFF_DASHBOARD: "/staff-dashboard",
  STAFF_DASHBOARD_FACULTY: "/staff-dashboard/faculty",
  STAFF_DASHBOARD_FACULTY_SUBITEM_1: "/staff-dashboard/faculty/subitem-1",
  STAFF_DASHBOARD_FACULTY_SUBITEM_2: "/staff-dashboard/faculty/subitem-2",
  STAFF_DASHBOARD_REGISTRY: "/staff-dashboard/registry",
  STAFF_DASHBOARD_REGISTRY_SUBITEM_1: "/staff-dashboard/registry/subitem-1",
  STAFF_DASHBOARD_REGISTRY_SUBITEM_2: "/staff-dashboard/registry/subitem-2",

  ELINK_ANDROID:
    "https://play.google.com/store/apps/details?id=ng.edu.nou.elink&hl=en",
  ELINK_IOS: "https://apps.apple.com/ng/app/noun-elink/id1445358235",
} as const;

export type AppRoute = (typeof Routes)[keyof typeof Routes];

export type InternalRouteName = {
  [K in keyof typeof Routes]: K extends `ELINK_${string}` ? never : K;
}[keyof typeof Routes];

export type InternalRoute = (typeof Routes)[InternalRouteName];
