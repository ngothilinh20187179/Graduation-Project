import { RequestParams } from "types/param.types";

const ClassesEndpoints = {
  GET_CLASSES: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/classes?page=${page}&pageSize=${pageSize}`;
    }
    return `/classes?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_CLASS: (id: number) => `/class/${id}`,
  GET_SUBJECTS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/subjects?page=${page}&pageSize=${pageSize}`;
    }
    return `/subjects?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_SUBJECT: (id: number) => `/subject/${id}`,
  CREATE_SUBJECT: () => `create-subject`,
  UPDATE_SUBJECT: (id: number) =>  `update-subject/${id}`,
  DELETE_SUBJECT: (id: number) => `/remove-subject/${id}`,
  GET_ROOMS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/rooms?page=${page}&pageSize=${pageSize}`;
    }
    return `/rooms?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_ROOM: (id: number) => `/room/${id}`,
  CREATE_ROOM: () => `create-room`,
  UPDATE_ROOM: (id: number) =>  `update-room/${id}`,
  DELETE_ROOM: (id: number) => `/remove-room/${id}`,
};

export default ClassesEndpoints;
