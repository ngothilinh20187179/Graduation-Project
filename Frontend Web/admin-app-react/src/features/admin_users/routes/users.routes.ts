import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { UserRoutePaths } from "../admin_users";

const ADMINS_SCREEN: RouteItem = {
  id: "admin-admins",
  path: UserRoutePaths.GET_ADMINS,
  component: lazy(() => import("../screens/AdminScreen/AdminScreen")),
};

const ADMIN_DETAIL_SCREEN: RouteItem = {
  id: "admin-admin-detail",
  path: UserRoutePaths.GET_ADMIN,
  component: lazy(
    () => import("../screens/AdminDetailScreen/AdminDetailScreen")
  ),
};

const EDIT_ADMIN_SCREEN: RouteItem = {
  id: "admin-edit-admin",
  path: UserRoutePaths.EDIT_ADMIN,
  component: lazy(
    () => import("../screens/EditAdminScreen/EditAdminScreen")
  ),
};

const CREATE_ADMIN_SCREEN: RouteItem = {
  id: "admin-create-admin",
  path: UserRoutePaths.CREATE_ADMIN,
  component: lazy(
    () => import("../screens/CreateAdminScreen/CreateAdminScreen")
  ),
};

const STAFFS_SCREEN: RouteItem = {
  id: "admin-staffs",
  path: UserRoutePaths.GET_STAFFS,
  component: lazy(() => import("../screens/StaffScreen/StaffScreen")),
};

const STAFF_DETAIL_SCREEN: RouteItem = {
  id: "admin-staff-detail",
  path: UserRoutePaths.GET_STAFF,
  component: lazy(
    () => import("../screens/StaffDetailScreen/StaffDetailScreen")
  ),
};

const CREATE_STAFF_SCREEN: RouteItem = {
  id: "admin-create-staff",
  path: UserRoutePaths.CREATE_STAFF,
  component: lazy(
    () => import("../screens/CreateStaffScreen/CreateStaffScreen")
  ),
};

const EDIT_STAFF_SCREEN: RouteItem = {
  id: "admin-edit-staff",
  path: UserRoutePaths.EDIT_STAFF,
  component: lazy(
    () => import("../screens/EditStaffScreen/EditStaffScreen")
  ),
};

const TEACHERS_SCREEN: RouteItem = {
  id: "admin-admins",
  path: UserRoutePaths.GET_TEACHERS,
  component: lazy(() => import("../screens/TeacherScreen/TeacherScreen")),
};

const TEACHER_DETAIL_SCREEN: RouteItem = {
  id: "admin-teacher-detail",
  path: UserRoutePaths.GET_TEACHER,
  component: lazy(
    () => import("../screens/TeacherDetailScreen/TeacherDetailScreen")
  ),
};

const CREATE_TEACHER_SCREEN: RouteItem = {
  id: "admin-create-teacher",
  path: UserRoutePaths.CREATE_TEACHER,
  component: lazy(
    () => import("../screens/CreateTeacherScreen/CreateTeacherScreen")
  ),
};

const EDIT_TEACHER_SCREEN: RouteItem = {
  id: "admin-edit-teacher",
  path: UserRoutePaths.EDIT_TEACHER,
  component: lazy(
    () => import("../screens/EditTeacherScreen/EditTeacherScreen")
  ),
};

const STUDENTS_SCREEN: RouteItem = {
  id: "admin-admins",
  path: UserRoutePaths.GET_STUDENTS,
  component: lazy(() => import("../screens/StudentScreen/StudentScreen")),
};

const STUDENT_DETAIL_SCREEN: RouteItem = {
  id: "admin-student-detail",
  path: UserRoutePaths.GET_STUDENT,
  component: lazy(
    () => import("../screens/StudentDetailScreen/StudentDetailScreen")
  ),
};

const CREATE_STUDENT_SCREEN: RouteItem = {
  id: "admin-create-student",
  path: UserRoutePaths.CREATE_STUDENT,
  component: lazy(
    () => import("../screens/CreateStudentScreen/CreateStudentScreen")
  ),
};

const EDIT_STUDENT_SCREEN: RouteItem = {
  id: "admin-edit-student",
  path: UserRoutePaths.EDIT_STUDENT,
  component: lazy(
    () => import("../screens/EditStudentScreen/EditStudentScreen")
  ),
};

export const USERS_ROUTES = [
  ADMINS_SCREEN,
  ADMIN_DETAIL_SCREEN,
  CREATE_ADMIN_SCREEN,
  EDIT_ADMIN_SCREEN,
  STAFFS_SCREEN,
  STAFF_DETAIL_SCREEN,
  CREATE_STAFF_SCREEN,
  EDIT_STAFF_SCREEN,
  TEACHERS_SCREEN,
  TEACHER_DETAIL_SCREEN,
  CREATE_TEACHER_SCREEN,
  EDIT_TEACHER_SCREEN,
  STUDENTS_SCREEN,
  STUDENT_DETAIL_SCREEN,
  CREATE_STUDENT_SCREEN,
  EDIT_STUDENT_SCREEN,
];
