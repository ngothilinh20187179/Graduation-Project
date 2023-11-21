import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import NotificationEndpoints from "../constants/notification.endpoints";
import { CreateNotification } from "../types/notification.types";

export const getReceivedNotificationsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(NotificationEndpoints.GET_RECEIVED_NOTIFICATIONS(params));
};

export const getSentNotificationsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(NotificationEndpoints.GET_SENT_NOTIFICATIONS(params));
};

export const getReceiversNotificationApi = (): Promise<AxiosResponse> => {
  return api.get(NotificationEndpoints.GET_RECEIVERS_NOTIFICATION());
};

export const deleteNotificationApi = (id: number): Promise<AxiosResponse> => {
  return api.put(NotificationEndpoints.DELETE_NOTIFICATION(), id);
};

export const createNotificationApi = (
  data: CreateNotification
): Promise<AxiosResponse> => {
  return api.post(NotificationEndpoints.CREATE_NOTIFICATIONS(), data);
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

export const getSentNotificationDetailApi = (id: number): Promise<AxiosResponse> => {
  return api.get(NotificationEndpoints.GET_SENT_NOTIFICATION_DETAIL(id));
};