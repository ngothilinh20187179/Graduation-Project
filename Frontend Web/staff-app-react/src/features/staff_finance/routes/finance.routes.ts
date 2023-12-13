import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { FinanceRoutePaths } from "../staff_finance";

const FINANCE_SCREEN: RouteItem = {
  id: "staff-finance",
  path: FinanceRoutePaths.FINANCE,
  component: lazy(() => import("../screens/FinanceScreen/FinanceScreen")),
};

const SPENDING_SCREEN: RouteItem = {
  id: "staff-spendings",
  path: FinanceRoutePaths.SPENDING,
  component: lazy(() => import("../screens/SpendingScreen/SpendingScreen")),
};

const EDIT_SPENDING_SCREEN: RouteItem = {
  id: "staff-spendings-edit",
  path: FinanceRoutePaths.EDIT_SPENDING,
  component: lazy(() => import("../screens/EditSubjectSpending/EditSubjectSpending")),
};

const CREATE_SPENDING_SCREEN: RouteItem = {
  id: "staff-spendings-create",
  path: FinanceRoutePaths.CREATE_SPENDING,
  component: lazy(() => import("../screens/CreateSpending/CreateSpending")),
};


export const FINANCE_ROUTES = [
  FINANCE_SCREEN,
  SPENDING_SCREEN,
  EDIT_SPENDING_SCREEN,
  CREATE_SPENDING_SCREEN,
];
