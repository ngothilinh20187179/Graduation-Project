export const UserRoutePaths = {
  GET_ADMINS: "/admins",
  GET_ADMIN: "/admin/:id",
  CREATE_ADMIN: "/admin/create",
  EDIT_ADMIN: "/admin/edit/:id",
  GET_STAFFS: "/staffs",
  GET_STAFF: "/staff/:id",
  CREATE_STAFF: "/staff/create",
  EDIT_STAFF: "/staff/edit/:id",
  GET_TEACHERS: "/teachers",
  GET_STUDENTS: "/students",
};

export const UserPaths = {
  GET_ADMINS: () => "/admins",
  GET_ADMIN: (id: number) => `/admin/${id}`,
  CREATE_ADMIN: () => "/admin/create",
  EDIT_ADMIN: (id: number) => `/admin/edit/${id}`,
  GET_STAFFS: () => "/staffs",
  GET_STAFF: (id: number) => `/staff/${id}`,
  CREATE_STAFF: () => "/staff/create",
  EDIT_STAFF: (id: number) => `/staff/edit/${id}`,
  GET_TEACHERS: () => "/teachers",
  GET_STUDENTS: () => "/students",
};
