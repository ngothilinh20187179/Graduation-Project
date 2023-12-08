import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { PositionRoutePaths } from "../constants/position.paths";

const POSITION_SCREEN: RouteItem = {
  id: "admin-position",
  path: PositionRoutePaths.POSITIONS,
  component: lazy(() => import("../screens/PositionScreen/PositionScreen")),
};

export const POSITION_ROUTES = [
    POSITION_SCREEN,
];
