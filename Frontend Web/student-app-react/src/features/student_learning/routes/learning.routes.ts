import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { LearningRoutePaths } from "../student_learning";


const LEARNING_SCREEN: RouteItem = {
  id: "student-transcript",
  path: LearningRoutePaths.TRANSCRIPT,
  component: lazy(() => import("../screens/TranscriptScreen/TranscriptScreen")),
}; 

const ONLINE_TEST_SCORES_SCREEN: RouteItem = {
  id: "student-online-test-score",
  path: LearningRoutePaths.QUIZ_MARKS,
  component: lazy(() => import("../screens/OnlineTestScoresScreen/OnlineTestScoresScreen")),
}; 

const OFFLINE_TEST_SCORES_SCREEN: RouteItem = {
  id: "student-offline-test-score",
  path: LearningRoutePaths.MARKS,
  component: lazy(() => import("../screens/OfflineTestScoresScreen/OfflineTestScoresScreen")),
}; 

const MY_TEST_SCREEN: RouteItem = {
  id: "student-tests",
  path: LearningRoutePaths.MY_TESTS,
  component: lazy(() => import("../screens/MyTestsScreen/MyTestsScreen")),
}; 

const MY_CLASSES: RouteItem = {
  id: "student-classes",
  path: LearningRoutePaths.CLASSES,
  component: lazy(() => import("../screens/ClassScreen/ClassScreen")),
}; 

const MY_CLASS_DETAIL: RouteItem = {
  id: "student-class-detail",
  path: LearningRoutePaths.GET_CLASS,
  component: lazy(() => import("../screens/ClassDetailScreen/ClassDetailScreen")),
}; 

const GET_THE_TEST: RouteItem = {
  id: "student-take-the-test",
  path: LearningRoutePaths.GET_QUIZ,
  component: lazy(() => import("../screens/TakeTheTestScreen/TakeTheTestScreen")),
}; 

const MY_LEARNING_SCHEDULE: RouteItem = {
  id: "student-schedule",
  path: LearningRoutePaths.MY_LEARNING_SCHEDULE,
  component: lazy(() => import("../screens/MyLearningScheduleScreen/MyLearningScheduleScreen")),
}; 

export const LEARNING_ROUTES = [
  LEARNING_SCREEN,
  ONLINE_TEST_SCORES_SCREEN,
  OFFLINE_TEST_SCORES_SCREEN,
  MY_TEST_SCREEN,
  MY_CLASSES,
  MY_CLASS_DETAIL,
  GET_THE_TEST,
  MY_LEARNING_SCHEDULE
];
