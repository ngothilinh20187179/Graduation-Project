import { AxiosResponse } from "axios";
import { api } from "api/api";
import AdminSettingEndpoints from "../constants/setting.endpoints";
import { ChangePasswordRequestBody } from "../admin_setting";

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(AdminSettingEndpoints.GET_MY_AVATAR());
};

export const changePasswordApi = (
  data: ChangePasswordRequestBody
): Promise<AxiosResponse> => {
  return api.put(AdminSettingEndpoints.CHANGE_PASSWORD(), data);
};
