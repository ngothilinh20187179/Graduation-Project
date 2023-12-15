import { AxiosResponse } from "axios";
import { api } from "api/api";
import TeacherSettingEndpoints from "../constants/setting.endpoints";
import { ChangePasswordRequestBody } from "../teacher_setting";
import { EditInformationRequestBody } from "features/teacher_users/teacher_users";

export const changePasswordApi = (
  data: ChangePasswordRequestBody
): Promise<AxiosResponse> => {
  return api.put(TeacherSettingEndpoints.CHANGE_PASSWORD(), data);
};

export const getMyProfileApi = (): Promise<AxiosResponse> => {
  return api.get(TeacherSettingEndpoints.GET_MY_PROFILE());
};

export const changeAvatarApi = (data: FormData): Promise<AxiosResponse> => {
  return api.put(TeacherSettingEndpoints.CHANGE_AVATAR(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatarApi = (): Promise<AxiosResponse> => {
  return api.delete(TeacherSettingEndpoints.DELETE_AVATAR());
};

export const changeInformationApi = (
  data: EditInformationRequestBody
): Promise<AxiosResponse> => {
  return api.put(TeacherSettingEndpoints.CHANGE_INFORMATION(), data);
};
