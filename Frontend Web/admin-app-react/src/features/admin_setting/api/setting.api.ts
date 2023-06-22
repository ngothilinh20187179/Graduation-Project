import { AxiosResponse } from "axios";
import { api } from "api/api";
import AdminSettingEndpoints from "../constants/setting.endpoints";
import { ChangePasswordRequestBody } from "../admin_setting";

export const changePasswordApi = (
  data: ChangePasswordRequestBody
): Promise<AxiosResponse> => {
  return api.put(AdminSettingEndpoints.CHANGE_PASSWORD(), data);
};

export const getMyProfileApi = (): Promise<AxiosResponse> => {
  return api.get(AdminSettingEndpoints.GET_MY_PROFILE());
};

export const changeAvatarApi = (data: FormData): Promise<AxiosResponse> => {
  return api.put(AdminSettingEndpoints.CHANGE_AVATAR(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatarApi = (): Promise<AxiosResponse> => {
  return api.delete(AdminSettingEndpoints.DELETE_AVATAR());
};
