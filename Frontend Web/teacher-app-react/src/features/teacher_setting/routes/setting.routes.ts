import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { SettingRoutePaths } from "../teacher_setting";

const CHANGE_PASSWORD_SCREEN: RouteItem = {
  id: "teacher-setting-change-pwd",
  path: SettingRoutePaths.CHANGE_PASSWORD,
  component: lazy(
    () => import("../screens/ChangePasswordScreen/ChangePasswordScreen")
  ),
};

const EDIT_PROFILE: RouteItem = {
  id: "teacher-setting-edit-my-profile",
  path: SettingRoutePaths.CHANGE_INFORMATION,
  component: lazy(
    () => import("../screens/EditInformationScreen/EditInformationScreen")
  ),
};

export const SETTING_ROUTES = [
  CHANGE_PASSWORD_SCREEN,
  EDIT_PROFILE,
];
