import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { SettingRoutePaths } from "../admin_setting";

const SETTING_SCREEN: RouteItem = {
  id: "admin-setting",
  path: SettingRoutePaths.SETTING,
  component: lazy(() => import("../screens/SettingScreen/SettingScreen")),
};

export const SETTING_ROUTES = [SETTING_SCREEN];
