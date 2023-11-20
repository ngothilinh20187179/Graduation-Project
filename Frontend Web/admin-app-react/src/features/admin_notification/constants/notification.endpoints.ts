import { RequestParams } from "types/param.types";

const NotificationEndpoints = {
  GET_RECEIVED_NOTIFICATION: ({ page, pageSize }: RequestParams) => {
    return `/received-notifications?page=${page}&pageSize=${pageSize}`;
  },
  GET_RECEIVERS_NOTIFICATION: () => {
    return `/receivers-notification`;
  },
  DELETE_NOTIFICATION: () => `/remove-notification`,
  CREATE_NOTIFICATION: () => `/create-notification`,
  MARK_UNMARK_NOTIFICATION: () => `/mark-unmark-notification`,
  GET_RECEIVED_NOTIFICATION_DETAIL: (id: number) => `/received-notification-detail/${id}`,
  CONFIRM_READ_NOTIFICATION: () => `/confirm-read-notification`
};

export default NotificationEndpoints;
