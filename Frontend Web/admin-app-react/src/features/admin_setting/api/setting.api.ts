import { AxiosResponse } from "axios";
import { api } from "api/api";
import AdminSettingEndpoints from "../constants/setting.endpoints";

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(AdminSettingEndpoints.GET_MY_AVATAR());
};
