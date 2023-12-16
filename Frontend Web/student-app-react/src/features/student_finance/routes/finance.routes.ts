import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { FinanceRoutePaths } from "../student_finance";

const FINANCE_SCREEN: RouteItem = {
  id: "student-finance",
  path: FinanceRoutePaths.TUITION_DEBT,
  component: lazy(() => import("../screens/TuitionDebtScreen/TuitionDebtScreen")),
}; 

export const FINANCE_ROUTES = [
  FINANCE_SCREEN,
];
