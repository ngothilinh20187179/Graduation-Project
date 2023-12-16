import { RequestParams } from "types/param.types";

const NotificationEndpoints = {
  GET_RECEIVED_NOTIFICATIONS: ({ page, pageSize, isMarked }: RequestParams) => {
    if (isMarked === undefined) {
      return `/received-notifications?page=${page}&pageSize=${pageSize}`;
    }
    return `/received-notifications?isMarked=${isMarked}&page=${page}&pageSize=${pageSize}`;
  },
  DELETE_NOTIFICATION: () => `/remove-notification`,
  MARK_UNMARK_NOTIFICATION: () => `/mark-unmark-notification`,
  GET_RECEIVED_NOTIFICATION_DETAIL: (id: number) => `/received-notification-detail/${id}`,
  CONFIRM_READ_NOTIFICATION: () => `/confirm-read-notification`
};

export default NotificationEndpoints;
