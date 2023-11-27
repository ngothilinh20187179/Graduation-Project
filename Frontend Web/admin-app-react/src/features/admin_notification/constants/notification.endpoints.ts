import { RequestParams } from "types/param.types";

const NotificationEndpoints = {
  GET_RECEIVED_NOTIFICATIONS: ({ page, pageSize, isMarked }: RequestParams) => {
    if (isMarked === undefined) {
      return `/received-notifications?page=${page}&pageSize=${pageSize}`;
    }
    return `/received-notifications?isMarked=${isMarked}&page=${page}&pageSize=${pageSize}`;
  },
  GET_SENT_NOTIFICATIONS: ({ page, pageSize, isMarked }: RequestParams) => {
    if (isMarked === undefined) {
      return `/sent-notifications?page=${page}&pageSize=${pageSize}`;
    }
    return `/sent-notifications?isMarked=${isMarked}&page=${page}&pageSize=${pageSize}`;
  },
  GET_RECEIVERS_NOTIFICATION: () => {
    return `/receivers-notification`;
  },
  DELETE_NOTIFICATION: () => `/remove-notification`,
  CREATE_NOTIFICATIONS: () => `/create-notification`,
  MARK_UNMARK_NOTIFICATION: () => `/mark-unmark-notification`,
  GET_RECEIVED_NOTIFICATION_DETAIL: (id: number) => `/received-notification-detail/${id}`,
  GET_SENT_NOTIFICATION_DETAIL: (id: number) => `/sent-notification-detail/${id}`,
  CONFIRM_READ_NOTIFICATION: () => `/confirm-read-notification`
};

export default NotificationEndpoints;
