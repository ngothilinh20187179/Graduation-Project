export const ClassesRoutePaths = {
  SUBJECTS: "/subjects",
  EDIT_SUBJECT: "/subjects/update/:id",
  CREATE_SUBJECT: "/subjects/create",
  ROOMS: "/rooms",
  CREATE_ROOM: "/rooms/create",
  EDIT_ROOM: "/rooms/update/:id",
  CLASSES: "/classes",
};

export const ClassesPaths = {
  SUBJECTS: () => "/subjects",
  EDIT_SUBJECT: (id: number) => `/subjects/update/${id}`,
  CREATE_SUBJECT: () => "/subjects/create",
  ROOMS: () => "/rooms",
  EDIT_ROOM: (id: number) => `/rooms/update/${id}`,
  CREATE_ROOM: () => "/rooms/create",
  CLASSES: () => "/classes",
};
