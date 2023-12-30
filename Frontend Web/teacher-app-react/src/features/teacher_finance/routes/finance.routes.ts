import { RouteItem } from "types/route.types";
import { FinanceRoutePaths } from "../teacher_finance";
import { lazy } from "react";

const SALARY_SCREEN: RouteItem = {
  id: "teacher-salary",
  path: FinanceRoutePaths.SALARY,
  component: lazy(
    () => import("../screens/TeacherSalaryScreen/TeacherSalaryScreen")
  ),
};

export const FINANCE_ROUTES = [SALARY_SCREEN];
