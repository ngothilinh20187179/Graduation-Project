import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { SettingRoutePaths } from "../admin_setting";

const SETTING_SCREEN: RouteItem = {
  id: "admin-setting",
  path: SettingRoutePaths.SETTING,
  component: lazy(() => import("../screens/SettingScreen/SettingScreen")),
};

const CHANGE_PASSWORD_SCREEN: RouteItem = {
  id: "admin-setting-change-pwd",
  path: SettingRoutePaths.CHANGE_PASSWORD,
  component: lazy(
    () => import("../screens/ChangePasswordScreen/ChangePasswordScreen")
  ),
};

export const SETTING_ROUTES = [SETTING_SCREEN, CHANGE_PASSWORD_SCREEN];
