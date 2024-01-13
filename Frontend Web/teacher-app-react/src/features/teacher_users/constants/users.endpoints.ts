import { RequestParams } from "types/param.types";

const UsersEndpoints = {
  GET_MY_AVATAR: () => `/myavatar`,
  GET_STUDENTS_IN_CLASS: ({ id, page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/class/${id}/students?page=${page}&pageSize=${pageSize}`;
    }
    return `/class/${id}/students?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_STUDENT: (id: number) => `/student/${id}`,
  GET_ALL_STUDENTS_IN_CLASS: (id: number) => `/class/${id}/all-students`,
};

export default UsersEndpoints;
