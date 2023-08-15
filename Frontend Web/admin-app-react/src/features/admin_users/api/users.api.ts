import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import { UserStatusType } from "../constants/users.constants";
import UsersEndpoints from "../constants/users.endpoints";
import { AdminInformation } from "../admin_users";

export const getAdminByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_ADMIN(id));
};

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_MY_AVATAR());
};

export const getAdminsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_ADMINS(params));
};

export const restricteAccountApi = (
  id: number,
  userStatusType: UserStatusType
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.RESTRICTE_ACCOUNT(id), userStatusType);
};

export const updateAdminInfoApi = (
  id: number,
  data: AdminInformation
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.EDIT_ADMIN(id), data);
}

export const createAdminInfoApi = (
  data: AdminInformation
): Promise<AxiosResponse> => {
  return api.post(UsersEndpoints.CREATE_ADMIN(), data);
}