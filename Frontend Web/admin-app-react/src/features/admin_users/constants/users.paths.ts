export const UserRoutePaths = {
  GET_ALL_USERS: "/users",
  GET_USER: "/user/:id",
};

export const UserPaths = {
  GET_ALL_USER: () => "/users",
  GET_USER: (id: number) => `/user/${id}`,
};
