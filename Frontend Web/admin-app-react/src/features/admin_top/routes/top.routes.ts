import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { TopRoutePaths } from "../constants/top.paths";

const TOP_SCREEN: RouteItem = {
  id: "admin-top",
  path: TopRoutePaths.TOP,
  component: lazy(() => import("../screens/TopScreen/TopScreen")),
}; 

export const TOP_ROUTES = [
  TOP_SCREEN,
];
