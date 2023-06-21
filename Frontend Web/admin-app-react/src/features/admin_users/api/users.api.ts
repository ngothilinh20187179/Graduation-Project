import { AxiosResponse } from "axios";
import AdminUsersEndpoints from "../constants/users.endpoints";
import { api } from "api/api";

export const getUserByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(AdminUsersEndpoints.GET_USER(id));
};

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(AdminUsersEndpoints.GET_MY_AVATAR());
};
