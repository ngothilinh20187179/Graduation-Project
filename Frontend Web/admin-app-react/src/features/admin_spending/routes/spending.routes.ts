import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { SpendingRoutePaths } from "../admin_spending";

const SPENDING_SCREEN: RouteItem = {
  id: "admin-spendings",
  path: SpendingRoutePaths.SPENDING,
  component: lazy(() => import("../screens/SpendingScreen/SpendingScreen")),
};

export const SPENDING_ROUTES = [
  SPENDING_SCREEN,
];
