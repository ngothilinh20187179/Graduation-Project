export const ClassesRoutePaths = {
  SUBJECTS: "/subjects",
  EDIT_SUBJECT: "/update-subject/:id",
  CREATE_SUBJECT: "/create-subject"
};

export const ClassesPaths = {
  SUBJECTS: () => "/subjects",
  EDIT_SUBJECT: (id: number) => `/update-subject/${id}`,
  CREATE_SUBJECT: () => "/create-subject"
};
