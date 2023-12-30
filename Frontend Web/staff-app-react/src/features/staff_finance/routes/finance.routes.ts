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

const STUDENT_TUITION_SCREEN: RouteItem = {
  id: "staff-student-tuition",
  path: FinanceRoutePaths.TUITION,
  component: lazy(() => import("../screens/StudentTuitionScreen/StudentTuitionScreen")),
};

const MY_SALARY_SCREEN: RouteItem = {
  id: "staff-my-salary",
  path: FinanceRoutePaths.MY_SALARY,
  component: lazy(() => import("../screens/MySalaryScreen/MySalaryScreen")),
};


export const FINANCE_ROUTES = [
  FINANCE_SCREEN,
  SPENDING_SCREEN,
  EDIT_SPENDING_SCREEN,
  CREATE_SPENDING_SCREEN,
  STUDENT_TUITION_SCREEN,
  MY_SALARY_SCREEN
];
