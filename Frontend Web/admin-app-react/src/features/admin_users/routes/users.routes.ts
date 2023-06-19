import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { UserRoutePaths } from "../admin_users";

const USER_DETAIL_SCREEN: RouteItem = {
  id: "admin-user-detail",
  path: UserRoutePaths.GET_USER,
  component: lazy(
    () => import("../screens/UsersDetailScreen/UsersDetailScreen")
  ),
};

const USERS_SCREEN: RouteItem = {
  id: "admin-users",
  path: UserRoutePaths.GET_ALL_USERS,
  component: lazy(() => import("../screens/UsersScreen/UsersScreen")),
};

export const USERS_ROUTES = [USER_DETAIL_SCREEN, USERS_SCREEN];
