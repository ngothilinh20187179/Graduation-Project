import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { UserRoutePaths } from "../admin_users";

const ADMIN_DETAIL_SCREEN: RouteItem = {
  id: "admin-admin-detail",
  path: UserRoutePaths.GET_ADMIN,
  component: lazy(
    () => import("../screens/AdminDetailScreen/AdminDetailScreen")
  ),
};

const USERS_SCREEN: RouteItem = {
  id: "admin-users",
  path: UserRoutePaths.GET_ALL_USERS,
  component: lazy(() => import("../screens/UsersScreen/UsersScreen")),
};

const ADMINS_SCREEN: RouteItem = {
  id: "admin-admins",
  path: UserRoutePaths.GET_ADMINS,
  component: lazy(() => import("../screens/AdminScreen/AdminScreen")),
};

const EDIT_ADMIN_SCREEN: RouteItem = {
  id: "admin-edit-admin",
  path: UserRoutePaths.EDIT_ADMIN,
  component: lazy(
    () => import("../screens/EditAdminScreen/EditAdminScreen")
  ),
};

const CREATE_ADMIN_SCREEN: RouteItem = {
  id: "admin-create-admin",
  path: UserRoutePaths.CREATE_ADMIN,
  component: lazy(
    () => import("../screens/CreateAdminScreen/CreateAdminScreen")
  ),
};

export const USERS_ROUTES = [
  ADMIN_DETAIL_SCREEN,
  USERS_SCREEN,
  ADMINS_SCREEN,
  CREATE_ADMIN_SCREEN,
  EDIT_ADMIN_SCREEN,
];
