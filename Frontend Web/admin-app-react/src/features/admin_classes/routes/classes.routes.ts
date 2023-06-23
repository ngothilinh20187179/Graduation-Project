import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { ClassesRoutePaths } from "../admin_classes";

const SUBJECTS_SCREEN: RouteItem = {
  id: "admin-classes-subjects",
  path: ClassesRoutePaths.SUBJECTS,
  component: lazy(() => import("../screens/SubjectScreen/SubjectScreen")),
};

export const CLASSES_ROUTES = [SUBJECTS_SCREEN];
