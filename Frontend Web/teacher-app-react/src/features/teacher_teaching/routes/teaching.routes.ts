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

const MY_TEACHING_SCHEDULE_SCREEN: RouteItem = {
  id: "teacher-schedule",
  path: TeachingRoutePaths.MY_TEACHING_SCHEDULE,
  component: lazy(() => import("../screens/MyTeachingScheduleScreen/MyTeachingScheduleScreen")),
}; 

const LIST_QUIZZES_SCREEN: RouteItem = {
  id: "teacher-quizzes",
  path: TeachingRoutePaths.QUIZZES,
  component: lazy(() => import("../screens/ListQuizzesScreen/ListQuizzesScreen")),
}; 

const QUIZ_DETAIL_SCREEN: RouteItem = {
  id: "teacher-quiz-detail",
  path: TeachingRoutePaths.GET_QUIZ,
  component: lazy(() => import("../screens/QuizDetailScreen/QuizDetailScreen")),
};

const ENTER_TRANSCRIPT_SCREEN: RouteItem = {
  id: "teacher-enter-transcript",
  path: TeachingRoutePaths.ENTER_TRANSCRIPT,
  component: lazy(() => import("../screens/EnterTranscriptScreen/EnterTranscriptScreen")),
};

const CREATE_QUIZ_SCREEN: RouteItem = {
  id: "teacher-create-quiz",
  path: TeachingRoutePaths.CREATE_QUIZ,
  component: lazy(() => import("../screens/CreateQuizScreen/CreateQuizScreen")),
};

const ASSIGN_QUIZ_TO_CLASS_SCREEN: RouteItem = {
  id: "teacher-assign-class",
  path: TeachingRoutePaths.ASSIGN_CLASS,
  component: lazy(() => import("../screens/AssignQuizToClassScreen/AssignQuizToClassScreen")),
};

export const LEARNING_ROUTES = [
  MY_CLASSES,
  CLASS_DETAIL_SCREEN,
  LIST_STUDENTS_SCREEN,
  ONLINE_TEST_SCORES_SCREEN,
  OFFLINE_TEST_SCORES_SCREEN,
  MY_TEACHING_SCHEDULE_SCREEN,
  LIST_QUIZZES_SCREEN,
  QUIZ_DETAIL_SCREEN,
  ENTER_TRANSCRIPT_SCREEN,
  CREATE_QUIZ_SCREEN,
  ASSIGN_QUIZ_TO_CLASS_SCREEN
];
