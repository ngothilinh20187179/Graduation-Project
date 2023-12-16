import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import NotificationEndpoints from "../constants/notification.endpoints";

export const getReceivedNotificationsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(NotificationEndpoints.GET_RECEIVED_NOTIFICATIONS(params));
};

export const deleteNotificationApi = (id: number): Promise<AxiosResponse> => {
  return api.put(NotificationEndpoints.DELETE_NOTIFICATION(), id);
};

export const markUnMarkNotificationApi = (id: number): Promise<AxiosResponse> => {
  return api.put(NotificationEndpoints.MARK_UNMARK_NOTIFICATION(), id);
};

export const getReceivedNotificationDetailApi = (id: number): Promise<AxiosResponse> => {
  return api.get(NotificationEndpoints.GET_RECEIVED_NOTIFICATION_DETAIL(id));
};

export const confirmReadNotificationApi = (id: number): Promise<AxiosResponse> => {
  return api.put(NotificationEndpoints.CONFIRM_READ_NOTIFICATION(), id);
};