import { AUTH_ROUTES } from "features/staff_auth/staff_auth";
import { CLASSES_ROUTES } from "features/staff_classes/staff_classes";
import { FINANCE_ROUTES } from "features/staff_finance/staff_finance";
import { NOTIFICATION_ROUTES } from "features/staff_notification/staff_notification";
import { SETTING_ROUTES } from "features/staff_setting/routes/setting.routes";
import { TOP_ROUTES } from "features/staff_top/routes/top.routes";
import { USERS_ROUTES } from "features/staff_users/staff_users";

export const ROOT_ROUTE = "/";
export const FORBIDDEN_ROUTE = "/403";
export const REFUSED_CONNECTION_ROUTE = "/102";
export const LIST_PUBLIC_ROUTES = [...AUTH_ROUTES];
export const LIST_PRIVATE_ROUTES = [
  ...USERS_ROUTES,
  ...TOP_ROUTES,
  ...CLASSES_ROUTES,
  ...NOTIFICATION_ROUTES,
  ...SETTING_ROUTES,
  ...FINANCE_ROUTES
];
