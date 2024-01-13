export const TeachingRoutePaths = {
  CLASSES: "/classes",
  GET_CLASS: "/classes/:id",
  LIST_STUDENTS: "/classes/:id/students",
  MARKS: "/student/:id/offline-test-score",
  QUIZ_MARKS: "/student/:id/online-test-scores",
  MY_TEACHING_SCHEDULE: "/my-teaching-schedule",
  QUIZZES: "/quizzes",
  GET_QUIZ: "/quizzes/:id",
  ENTER_TRANSCRIPT: "/classes/:id/enter-transcript"
};

export const TeachingPaths = {
  CLASSES: () => "/classes",
  GET_CLASS: (id: number) => `/classes/${id}`,
  LIST_STUDENTS: (id: number) => `/classes/${id}/students`,
  MARKS: (id: number) => `/student/${id}/offline-test-score`,
  QUIZ_MARKS: (id: number) => `/student/${id}/online-test-scores`,
  MY_TEACHING_SCHEDULE: () => "/my-teaching-schedule",
  QUIZZES: () => "/quizzes",
  GET_QUIZ: (id: number) => `/quizzes/${id}`,
  ENTER_TRANSCRIPT: (id: number) => `/classes/${id}/enter-transcript`,
};
