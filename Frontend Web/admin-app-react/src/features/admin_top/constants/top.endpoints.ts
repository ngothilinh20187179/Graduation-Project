import { RequestParams } from "types/param.types";

const TopEndpoints = {
  GET_RECEIVED_NOTIFICATION: ({ page, pageSize }: RequestParams) => {
    return `/received-notifications?page=${page}&pageSize=${pageSize}`;
  },
};

export default TopEndpoints;
