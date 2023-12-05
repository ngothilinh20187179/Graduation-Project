import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { UserRoutePaths } from "../staff_users";

const STAFFS_SCREEN: RouteItem = {
  id: "staff-staffs",
  path: UserRoutePaths.GET_STAFFS,
  component: lazy(() => import("../screens/StaffScreen/StaffScreen")),
};

const STAFF_DETAIL_SCREEN: RouteItem = {
  id: "staff-staff-detail",
  path: UserRoutePaths.GET_STAFF,
  component: lazy(
    () => import("../screens/StaffDetailScreen/StaffDetailScreen")
  ),
};

const TEACHERS_SCREEN: RouteItem = {
  id: "staff-admins",
  path: UserRoutePaths.GET_TEACHERS,
  component: lazy(() => import("../screens/TeacherScreen/TeacherScreen")),
};

const TEACHER_DETAIL_SCREEN: RouteItem = {
  id: "staff-teacher-detail",
  path: UserRoutePaths.GET_TEACHER,
  component: lazy(
    () => import("../screens/TeacherDetailScreen/TeacherDetailScreen")
  ),
};

const CREATE_TEACHER_SCREEN: RouteItem = {
  id: "staff-create-teacher",
  path: UserRoutePaths.CREATE_TEACHER,
  component: lazy(
    () => import("../screens/CreateTeacherScreen/CreateTeacherScreen")
  ),
};

const EDIT_TEACHER_SCREEN: RouteItem = {
  id: "staff-edit-teacher",
  path: UserRoutePaths.EDIT_TEACHER,
  component: lazy(
    () => import("../screens/EditTeacherScreen/EditTeacherScreen")
  ),
};

const STUDENTS_SCREEN: RouteItem = {
  id: "staff-admins",
  path: UserRoutePaths.GET_STUDENTS,
  component: lazy(() => import("../screens/StudentScreen/StudentScreen")),
};

const STUDENT_DETAIL_SCREEN: RouteItem = {
  id: "staff-student-detail",
  path: UserRoutePaths.GET_STUDENT,
  component: lazy(
    () => import("../screens/StudentDetailScreen/StudentDetailScreen")
  ),
};

const CREATE_STUDENT_SCREEN: RouteItem = {
  id: "staff-create-student",
  path: UserRoutePaths.CREATE_STUDENT,
  component: lazy(
    () => import("../screens/CreateStudentScreen/CreateStudentScreen")
  ),
};

const EDIT_STUDENT_SCREEN: RouteItem = {
  id: "staff-edit-student",
  path: UserRoutePaths.EDIT_STUDENT,
  component: lazy(
    () => import("../screens/EditStudentScreen/EditStudentScreen")
  ),
};

export const USERS_ROUTES = [
  STAFFS_SCREEN,
  STAFF_DETAIL_SCREEN,
  TEACHERS_SCREEN,
  TEACHER_DETAIL_SCREEN,
  CREATE_TEACHER_SCREEN,
  EDIT_TEACHER_SCREEN,
  STUDENTS_SCREEN,
  STUDENT_DETAIL_SCREEN,
  CREATE_STUDENT_SCREEN,
  EDIT_STUDENT_SCREEN,
];
