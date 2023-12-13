import { RequestParams } from "types/param.types";

const SpendingEndpoints = {
  GET_SPENDINGS: ({ page, pageSize, spendingStatus }: RequestParams) => {
    if (spendingStatus === undefined) {
      return `/spendings?page=${page}&pageSize=${pageSize}`;
    }
    return `/spendings?spendingStatus=${spendingStatus}&page=${page}&pageSize=${pageSize}`;
  },
  ACCEPT_OR_REJECT_SPENDING: (id: number) => `/accept-or-reject-spending/${id}`,
};

export default SpendingEndpoints;
