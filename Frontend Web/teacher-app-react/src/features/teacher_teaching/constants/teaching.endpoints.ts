import { RequestParams } from "types/param.types";

const TeachingEndpoints = {
  GET_MY_CLASSES: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/teacher-classes?page=${page}&pageSize=${pageSize}`;
    }
    return `/teacher-classes?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_CLASS: (id: number) => `/class/${id}`,
};

export default TeachingEndpoints;
