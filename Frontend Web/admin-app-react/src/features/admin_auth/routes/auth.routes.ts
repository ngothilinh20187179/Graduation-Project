import { lazy } from "react";
import { RouteItem } from "../../../types/route.types";
import { AuthRoutePaths } from "../admin_auth";

const LOGIN_SCREEN: RouteItem = {
  id: "admin-auth-login",
  path: AuthRoutePaths.LOGIN,
  component: lazy(() => import("../screens/LoginScreen/LoginScreen")),
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
