export const TeachingRoutePaths = {
  CLASSES: "/classes",
  GET_CLASS: "/class/:id",
  LIST_STUDENTS: "/class/:id/students",
};

export const TeachingPaths = {
  CLASSES: () => "/classes",
  GET_CLASS: (id: number) => `/class/${id}`,
  LIST_STUDENTS: (id: number) => `/class/${id}/students`,
};
