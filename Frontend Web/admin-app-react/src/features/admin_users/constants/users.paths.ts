export const UserRoutePaths = {
  GET_ALL_USERS: "/users",
  GET_ADMIN: "/admin/:id",
  GET_ADMINS: "/admins",
  CREATE_ADMIN: "/create-admin",
  EDIT_ADMIN: "/edit-admin/:id",
};

export const UserPaths = {
  GET_ALL_USER: () => "/users",
  GET_ADMIN: (id: number) => `/admin/${id}`,
  GET_ADMINS: () => "/admins",
  CREATE_ADMIN: () => "/create-admin",
  EDIT_ADMIN: (id: number) => `/edit-admin/${id}`,
};
