import { RequestParams } from "types/param.types";

const FinanceEndpoints = {
  GET_SPENDINGS: ({ page, pageSize, spendingStatus }: RequestParams) => {
    if (spendingStatus === undefined || spendingStatus === null) {
      return `/spendings?page=${page}&pageSize=${pageSize}`;
    }
    return `/spendings?spendingStatus=${spendingStatus}&page=${page}&pageSize=${pageSize}`;
  },
  GET_SPENDING: (id: number) => `/spending/${id}`,
  CREATE_SPENDING: () => `create-spending`,
  UPDATE_SPENDING: (id: number) =>  `update-spending/${id}`,
  ACCEPT_OR_REJECT_SPENDING: (id: number) => `/accept-or-reject-spending/${id}`,
  DELETE_SPENDING: (id: number) => `/remove-spending/${id}`,
  GET_STUDENT_TUITION: ({isPaidTuition, page, pageSize }: RequestParams) => {
    if (isPaidTuition === undefined || isPaidTuition === null) {
      return `/student-tuition?page=${page}&pageSize=${pageSize}`;
    }
    return `/student-tuition?isPaidTuition=${isPaidTuition}&page=${page}&pageSize=${pageSize}`;
  },
};

export default FinanceEndpoints;
