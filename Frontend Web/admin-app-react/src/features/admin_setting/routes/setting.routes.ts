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

const MY_PROFILE_SCREEN: RouteItem = {
  id: "admin-setting-my-profile",
  path: SettingRoutePaths.MY_PROFILE,
  component: lazy(() => import("../screens/MyProfileScreen/MyProfileScreen")),
};

const EDIT_PROFILE: RouteItem = {
  id: "admin-setting-edit-my-profile",
  path: SettingRoutePaths.CHANGE_INFORMATION,
  component: lazy(
    () => import("../screens/EditInformationScreen/EditInformationScreen")
  ),
};

const STATISTICAL_SCREEN: RouteItem = {
  id: "admin-statistical",
  path: SettingRoutePaths.STATISTICAL,
  component: lazy(() => import("../screens/StatisticalScreen/StatisticalScreen")),
};


export const SETTING_ROUTES = [
  SETTING_SCREEN,
  CHANGE_PASSWORD_SCREEN,
  MY_PROFILE_SCREEN,
  EDIT_PROFILE,
  STATISTICAL_SCREEN
];
