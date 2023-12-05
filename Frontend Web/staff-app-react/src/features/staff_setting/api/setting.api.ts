import { AxiosResponse } from "axios";
import { api } from "api/api";
import StaffSettingEndpoints from "../constants/setting.endpoints";
import { ChangePasswordRequestBody } from "../staff_setting";
import { EditInformationRequestBody } from "features/staff_users/staff_users";

export const changePasswordApi = (
  data: ChangePasswordRequestBody
): Promise<AxiosResponse> => {
  return api.put(StaffSettingEndpoints.CHANGE_PASSWORD(), data);
};

export const getMyProfileApi = (): Promise<AxiosResponse> => {
  return api.get(StaffSettingEndpoints.GET_MY_PROFILE());
};

export const changeAvatarApi = (data: FormData): Promise<AxiosResponse> => {
  return api.put(StaffSettingEndpoints.CHANGE_AVATAR(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatarApi = (): Promise<AxiosResponse> => {
  return api.delete(StaffSettingEndpoints.DELETE_AVATAR());
};

export const changeInformationApi = (
  data: EditInformationRequestBody
): Promise<AxiosResponse> => {
  return api.put(StaffSettingEndpoints.CHANGE_INFORMATION(), data);
};
