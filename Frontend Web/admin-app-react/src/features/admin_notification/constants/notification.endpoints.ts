import { RequestParams } from "types/param.types";

const NotificationEndpoints = {
  GET_RECEIVED_NOTIFICATION: ({ page, pageSize }: RequestParams) => {
    return `/received-notifications?page=${page}&pageSize=${pageSize}`;
  },
  DELETE_NOTIFICATION: () => `/remove-notification`,
};

export default NotificationEndpoints;
