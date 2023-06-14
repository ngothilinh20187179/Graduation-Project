import { AUTH_ROUTES } from "features/staff_auth/staff_auth";
import { TOP_ROUTES } from "features/staff_top/routes/top.routes";
import { USERS_ROUTES } from "features/staff_users/staff_users";

export const ROOT_ROUTE = "/";
export const FORBIDDEN_ROUTE = "/403";
export const LIST_ROUTES = [...USERS_ROUTES, ...AUTH_ROUTES, ...TOP_ROUTES];
