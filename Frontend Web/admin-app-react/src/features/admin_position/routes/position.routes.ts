import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { PositionRoutePaths } from "../constants/position.paths";

const POSITION_SCREEN: RouteItem = {
  id: "admin-position",
  path: PositionRoutePaths.POSITIONS,
  component: lazy(() => import("../screens/PositionScreen/PositionScreen")),
};

const EDIT_POSITION_SCREEN: RouteItem = {
  id: "admin-position-edit-position",
  path: PositionRoutePaths.EDIT_POSITION,
  component: lazy(
    () => import("../screens/EditPositionScreen/EditPositionScreen")
  ),
};

const CREATE_POSITION_SCREEN: RouteItem = {
  id: "admin-position-create-position",
  path: PositionRoutePaths.CREATE_POSITION,
  component: lazy(
    () => import("../screens/CreatePositionScreen/CreatePositionScreen")
  ),
};

export const POSITION_ROUTES = [
    POSITION_SCREEN,
    EDIT_POSITION_SCREEN,
    CREATE_POSITION_SCREEN
];
