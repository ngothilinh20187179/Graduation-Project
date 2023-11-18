import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import NotificationEndpoints from "../constants/notification.endpoints";


export const getReceivedNotificationsApi = (
    params: RequestParams
  ): Promise<AxiosResponse> => {
    return api.get(NotificationEndpoints.GET_RECEIVED_NOTIFICATION(params));
};

export const deleteNotificationApi = (id: number): Promise<AxiosResponse> => {
  return api.put(NotificationEndpoints.DELETE_NOTIFICATION(), id);
};