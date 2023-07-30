import { RequestParams } from "types/param.types";

const ClassesEndpoints = {
  GET_SUBJECTS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/subjects?page=${page}&pageSize=${pageSize}`;
    }
    return `/subjects?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  CREATE_SUBJECT: () => `create-subject`,
  DELETE_SUBJECT: (id: number) => `/remove-subject/${id}`,
};

export default ClassesEndpoints;
