import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { AuthRoutePaths } from "../student_auth";

const LOGIN_SCREEN: RouteItem = {
  id: "student-auth-login",
  path: AuthRoutePaths.LOGIN,
  component: lazy(() => import("../screens/LoginScreen/LoginScreen")),
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
