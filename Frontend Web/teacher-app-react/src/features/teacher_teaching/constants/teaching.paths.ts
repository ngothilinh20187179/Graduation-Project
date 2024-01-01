export const TeachingRoutePaths = {
  CLASSES: "/classes",
  GET_CLASS: "/class/:id",
  LIST_STUDENTS: "/class/:id/students",
  MARKS: "/student/:id/offline-test-score",
  QUIZ_MARKS: "/student/:id/online-test-scores",
};

export const TeachingPaths = {
  CLASSES: () => "/classes",
  GET_CLASS: (id: number) => `/class/${id}`,
  LIST_STUDENTS: (id: number) => `/class/${id}/students`,
  MARKS: (id: number) => `/student/${id}/offline-test-score`,
  QUIZ_MARKS: (id: number) => `/student/${id}/online-test-scores`,
};
