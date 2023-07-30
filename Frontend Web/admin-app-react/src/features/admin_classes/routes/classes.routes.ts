import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { ClassesRoutePaths } from "../admin_classes";

const SUBJECTS_SCREEN: RouteItem = {
  id: "admin-classes-subjects",
  path: ClassesRoutePaths.SUBJECTS,
  component: lazy(() => import("../screens/SubjectScreen/SubjectScreen")),
};

const EDIT_SUBJECTS_SCREEN: RouteItem = {
  id: "admin-classes-edit-subjects",
  path: ClassesRoutePaths.EDIT_SUBJECT,
  component: lazy(() => import("../screens/EditSubjectScreen/EditSubjectScreen")),
};

const CREATE_SUBJECTS_SCREEN: RouteItem = {
  id: "admin-classes-create-subjects",
  path: ClassesRoutePaths.CREATE_SUBJECT,
  component: lazy(() => import("../screens/CreateSubjectScreen/CreateSubjectScreen")),
};

export const CLASSES_ROUTES = [SUBJECTS_SCREEN, EDIT_SUBJECTS_SCREEN, CREATE_SUBJECTS_SCREEN];
