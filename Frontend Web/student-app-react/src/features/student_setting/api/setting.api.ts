import { AxiosResponse } from "axios";
import { api } from "api/api";
import StudentSettingEndpoints from "../constants/setting.endpoints";
import { ChangePasswordRequestBody } from "../student_setting";
import { EditInformationRequestBody } from "features/student_users/student_users";

export const changePasswordApi = (
  data: ChangePasswordRequestBody
): Promise<AxiosResponse> => {
  return api.put(StudentSettingEndpoints.CHANGE_PASSWORD(), data);
};

export const getMyProfileApi = (): Promise<AxiosResponse> => {
  return api.get(StudentSettingEndpoints.GET_MY_PROFILE());
};

export const changeAvatarApi = (data: FormData): Promise<AxiosResponse> => {
  return api.put(StudentSettingEndpoints.CHANGE_AVATAR(), data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatarApi = (): Promise<AxiosResponse> => {
  return api.delete(StudentSettingEndpoints.DELETE_AVATAR());
};

export const changeInformationApi = (
  data: EditInformationRequestBody
): Promise<AxiosResponse> => {
  return api.put(StudentSettingEndpoints.CHANGE_INFORMATION(), data);
};
