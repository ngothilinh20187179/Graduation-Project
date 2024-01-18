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

const TEACHER_SALARY_SCREEN: RouteItem = {
  id: "staff-teacher-salary",
  path: FinanceRoutePaths.TEACHER_SALARY,
  component: lazy(() => import("../screens/TeacherSalaryScreen/TeacherSalaryScreen")),
};

const STAFF_SALARY_SCREEN: RouteItem = {
  id: "staff-staff-salary",
  path: FinanceRoutePaths.STAFF_SALARY,
  component: lazy(() => import("../screens/StaffSalaryScreen/StaffSalaryScreen")),
};

const CREATE_TEACHER_SALARY_SCREEN: RouteItem = {
  id: "staff-create-teacher-salary",
  path: FinanceRoutePaths.CREATE_TEACHER_SALARY,
  component: lazy(() => import("../screens/CreateNewTeacherSalaryScreen/CreateNewTeacherSalaryScreen")),
};

const EDIT_TEACHER_SALARY_SCREEN: RouteItem = {
  id: "staff-teacher-salary-edit",
  path: FinanceRoutePaths.EDIT_TEACHER_SALARY,
  component: lazy(() => import("../screens/EditTeacherSalaryScreen/EditTeacherSalaryScreen")),
};

const CREATE_STAFF_SALARY_SCREEN: RouteItem = {
  id: "staff-create-staff-salary",
  path: FinanceRoutePaths.CREATE_STAFF_SALARY,
  component: lazy(() => import("../screens/CreateNewStaffSalaryScreen/CreateNewStaffSalaryScreen")),
};

const EDIT_STAFF_SALARY_SCREEN: RouteItem = {
  id: "staff-salary-edit",
  path: FinanceRoutePaths.EDIT_STAFF_SALARY,
  component: lazy(() => import("../screens/EditStaffSalaryScreen/EditStaffSalaryScreen")),
};

export const FINANCE_ROUTES = [
  FINANCE_SCREEN,
  SPENDING_SCREEN,
  EDIT_SPENDING_SCREEN,
  CREATE_SPENDING_SCREEN,
  STUDENT_TUITION_SCREEN,
  MY_SALARY_SCREEN,
  TEACHER_SALARY_SCREEN,
  STAFF_SALARY_SCREEN,
  CREATE_TEACHER_SALARY_SCREEN,
  EDIT_TEACHER_SALARY_SCREEN,
  CREATE_STAFF_SALARY_SCREEN,
  EDIT_STAFF_SALARY_SCREEN
];
