export const ClassesRoutePaths = {
  SUBJECTS: "/subjects",
  EDIT_SUBJECT: "/update-subject/:id",
  CREATE_SUBJECT: "/create-subject",
  ROOMS: "/rooms",
  CREATE_ROOM: "/create-room",
  EDIT_ROOM: "/update-room/:id",
};

export const ClassesPaths = {
  SUBJECTS: () => "/subjects",
  EDIT_SUBJECT: (id: number) => `/update-subject/${id}`,
  CREATE_SUBJECT: () => "/create-subject",
  ROOMS: () => "/rooms",
  EDIT_ROOM: (id: number) => `/update-room/${id}`,
  CREATE_ROOM: () => "/create-room",
};
