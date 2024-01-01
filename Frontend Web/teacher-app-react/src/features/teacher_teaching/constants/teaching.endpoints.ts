import { RequestParams } from "types/param.types";

const TeachingEndpoints = {
  GET_MY_CLASSES: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/teacher-classes?page=${page}&pageSize=${pageSize}`;
    }
    return `/teacher-classes?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_CLASS: (id: number) => `/class/${id}`,
  GET_MY_ONLINE_TEST_SCORES: ({ id, page, pageSize }: RequestParams) => {
    return `/student/${id}/online-test-scores?page=${page}&pageSize=${pageSize}`;
  },
  GET_MY_OFFLINE_TEST_SCORES: ({ id, page, pageSize }: RequestParams) => {
    return `/student/${id}/offline-test-scores?page=${page}&pageSize=${pageSize}`;
  },
};

export default TeachingEndpoints;
