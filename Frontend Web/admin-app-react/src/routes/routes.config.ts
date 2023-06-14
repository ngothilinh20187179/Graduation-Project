import { AUTH_ROUTES } from "features/admin_auth/admin_auth";
import { TOP_ROUTES } from "features/admin_top/routes/top.routes";
import { USERS_ROUTES } from "features/admin_users/admin_users";

export const ROOT_ROUTE = "/";
export const FORBIDDEN_ROUTE = "/403";
export const LIST_ROUTES = [...USERS_ROUTES, ...AUTH_ROUTES, ...TOP_ROUTES];
