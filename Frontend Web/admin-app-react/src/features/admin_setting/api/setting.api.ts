import { AxiosResponse } from "axios";
import { api } from "api/api";
import AdminSettingEndpoints from "../constants/setting.endpoints";
import { ChangePasswordRequestBody } from "../admin_setting";
import { EditInformationRequestBody } from "features/admin_users/admin_users";

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

export const changeInformationApi = (
  data: EditInformationRequestBody
): Promise<AxiosResponse> => {
  return api.put(AdminSettingEndpoints.CHANGE_INFORMATION(), data);
};

export const getGenderStudentStatisticalApi = (): Promise<AxiosResponse> => {
  return api.get(AdminSettingEndpoints.GET_GENDER_STUDENT_STATISTICAL());
};