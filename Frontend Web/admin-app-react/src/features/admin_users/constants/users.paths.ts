export const UserRoutePaths = {
  GET_ALL_USERS: "/users",
  GET_ADMIN: "/admins/:id",
  GET_ADMINS: "/admins",
  CREATE_ADMIN: "/admins/create",
  EDIT_ADMIN: "/admins/edit/:id",
};

export const UserPaths = {
  GET_ALL_USER: () => "/users",
  GET_ADMIN: (id: number) => `/admins/${id}`,
  GET_ADMINS: () => "/admins",
  CREATE_ADMIN: () => "/admins/create",
  EDIT_ADMIN: (id: number) => `/admins/edit/${id}`,
};
