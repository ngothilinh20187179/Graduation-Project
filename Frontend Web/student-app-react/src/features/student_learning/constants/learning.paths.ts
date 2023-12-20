export const LearningRoutePaths = {
  TRANSCRIPT: "/transcripts",
  MARKS: "/my-offline-test-score",
  QUIZ_MARKS: "/my-online-test-scores",
  MY_TESTS: "/my-tests",
  CLASSES: "/classes",
  GET_CLASS: "/classes/:id",
  GET_QUIZ: "/my-tests/:id",
};

export const LearningPaths = {
  TRANSCRIPT: () => "/transcripts",
  MARKS: () => "/my-offline-test-score",
  QUIZ_MARKS: () => "/my-online-test-scores",
  MY_TESTS: () => "/my-tests",
  CLASSES: () => "/classes",
  GET_CLASS: (id: number) => `/classes/${id}`,
  GET_QUIZ: (id: number) => `/my-tests/${id}`,
};
