import { RequestParams } from "types/param.types";

const LearningEndpoints = {
  GET_MY_ONLINE_TEST_SCORES: ({ page, pageSize }: RequestParams) => {
    return `/my-online-test-scores?page=${page}&pageSize=${pageSize}`;
  },
  GET_MY_OFFLINE_TEST_SCORES: ({ page, pageSize }: RequestParams) => {
    return `/my-offline-test-scores?page=${page}&pageSize=${pageSize}`;
  },
};

export default LearningEndpoints;
