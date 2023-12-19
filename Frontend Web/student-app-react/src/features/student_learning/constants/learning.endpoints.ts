import { RequestParams } from "types/param.types";

const LearningEndpoints = {
  GET_MY_ONLINE_TEST_SCORES: ({ page, pageSize }: RequestParams) => {
    return `/my-online-test-scores?page=${page}&pageSize=${pageSize}`;
  },
  GET_MY_OFFLINE_TEST_SCORES: ({ page, pageSize }: RequestParams) => {
    return `/my-offline-test-scores?page=${page}&pageSize=${pageSize}`;
  },
  GET_MY_TESTS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined) {
      return `/my-quizzes?page=${page}&pageSize=${pageSize}`;
    }
    return `/my-quizzes?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
};

export default LearningEndpoints;
