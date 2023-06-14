import { lazy } from "react";
import { RouteItem } from "types/route.types";

const TOP_SCREEN: RouteItem = {
  id: "admin-top",
  path: "/",
  component: lazy(() => import("../screens/TopScreen/TopScreen")),
};

export const TOP_ROUTES = [TOP_SCREEN];
