import { AxiosResponse } from "axios";
import UsersEndpoints from "../constants/users.endpoints";
import { api } from "api/api";

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_MY_AVATAR());
};

export const getStudentsInClassApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENTS_IN_CLASS(id));
};