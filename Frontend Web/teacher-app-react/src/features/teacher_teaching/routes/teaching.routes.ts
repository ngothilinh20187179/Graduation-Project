import { RouteItem } from "types/route.types";
import { TeachingRoutePaths } from "../constants/teaching.paths";
import { lazy } from "react";

const MY_CLASSES: RouteItem = {
  id: "teacher-classes",
  path: TeachingRoutePaths.CLASSES,
  component: lazy(() => import("../screens/ClassesScreen/ClassesScreen")),
}; 

const CLASS_DETAIL_SCREEN: RouteItem = {
  id: "teacher-class-detail",
  path: TeachingRoutePaths.GET_CLASS,
  component: lazy(() => import("../screens/ClassDetailScreen/ClassDetailScreen")),
};

const LIST_STUDENTS_SCREEN: RouteItem = {
  id: "teacher-get-list-students",
  path: TeachingRoutePaths.LIST_STUDENTS,
  component: lazy(() => import("../screens/ListStudentsInClassScreen/ListStudentsInClassScreen")),
};

const ONLINE_TEST_SCORES_SCREEN: RouteItem = {
  id: "student-online-test-score",
  path: TeachingRoutePaths.QUIZ_MARKS,
  component: lazy(() => import("../screens/OnlineTestScoresScreen/OnlineTestScoresScreen")),
}; 

const OFFLINE_TEST_SCORES_SCREEN: RouteItem = {
  id: "student-offline-test-score",
  path: TeachingRoutePaths.MARKS,
  component: lazy(() => import("../screens/OfflineTestScoresScreen/OfflineTestScoresScreen")),
}; 

export const LEARNING_ROUTES = [
  MY_CLASSES,
  CLASS_DETAIL_SCREEN,
  LIST_STUDENTS_SCREEN,
  ONLINE_TEST_SCORES_SCREEN,
  OFFLINE_TEST_SCORES_SCREEN
];
