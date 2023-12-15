import { AUTH_ROUTES } from "features/student_auth/student_auth";
import { NOTIFICATION_ROUTES } from "features/student_notification/student_notification";
import { SETTING_ROUTES } from "features/student_setting/routes/setting.routes";
import { TOP_ROUTES } from "features/student_top/routes/top.routes";

export const ROOT_ROUTE = "/";
export const FORBIDDEN_ROUTE = "/403";
export const REFUSED_CONNECTION_ROUTE = "/102";
export const LIST_PUBLIC_ROUTES = [...AUTH_ROUTES];
export const LIST_PRIVATE_ROUTES = [
  ...TOP_ROUTES,
  ...NOTIFICATION_ROUTES,
  ...SETTING_ROUTES,
];
