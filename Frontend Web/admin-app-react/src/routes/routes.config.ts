import { AUTH_ROUTES } from "features/admin_auth/admin_auth";
import { CLASSES_ROUTES } from "features/admin_classes/admin_classes";
import { NOTIFICATION_ROUTES } from "features/admin_notification/admin_notification";
import { POSITION_ROUTES } from "features/admin_position/admin_position";
import { SETTING_ROUTES } from "features/admin_setting/routes/setting.routes";
import { TOP_ROUTES } from "features/admin_top/routes/top.routes";
import { USERS_ROUTES } from "features/admin_users/admin_users";

export const ROOT_ROUTE = "/";
export const FORBIDDEN_ROUTE = "/403";
export const REFUSED_CONNECTION_ROUTE = "/102";
export const LIST_PUBLIC_ROUTES = [...AUTH_ROUTES];
export const LIST_PRIVATE_ROUTES = [
  ...USERS_ROUTES,
  ...TOP_ROUTES,
  ...SETTING_ROUTES,
  ...CLASSES_ROUTES,
  ...NOTIFICATION_ROUTES,
  ...POSITION_ROUTES,
];
