import { RequestParams } from "types/param.types";

const UsersEndpoints = {
  GET_ADMINS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/admins?page=${page}&pageSize=${pageSize}`;
    }
    return `/admins?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_ADMIN: (id: number) => `/admin/${id}`,
  GET_MY_AVATAR: () => `/myavatar`,
  RESTRICTE_ACCOUNT: (id: number) => `/restricted-user/${id}`,
  EDIT_ADMIN: (id: number) => `/edit-admin/${id}`,
  CREATE_ADMIN: () => `/create-admin`,
  GET_STAFFS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/staffs?page=${page}&pageSize=${pageSize}`;
    }
    return `/staffs?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_STAFF: (id: number) => `/staff/${id}`,
  CREATE_STAFF: () => `/create-staff`,
  EDIT_STAFF: (id: number) => `/edit-staff/${id}`,
  GET_TEACHERS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/teachers?page=${page}&pageSize=${pageSize}`;
    }
    return `/teachers?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_TEACHER: (id: number) => `/teacher/${id}`,
  EDIT_TEACHER: (id: number) => `/edit-teacher/${id}`,
  CREATE_TEACHER: () => `/create-teacher`,
  GET_STUDENTS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/students?page=${page}&pageSize=${pageSize}`;
    }
    return `/students?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_STUDENT: (id: number) => `/student/${id}`,
  EDIT_STUDENT: (id: number) => `/edit-student/${id}`,
  CREATE_STUDENT: () => `/create-student`,
  GET_STUDENTS_IN_CLASS: (id: number) => `/class/${id}/students`,
};

export default UsersEndpoints;
