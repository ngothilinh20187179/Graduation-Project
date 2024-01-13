import { AxiosResponse } from "axios";
import UsersEndpoints from "../constants/users.endpoints";
import { api } from "api/api";
import { RequestParams } from "types/param.types";

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_MY_AVATAR());
};

export const getStudentsInClassApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENTS_IN_CLASS(params));
};

export const getStudentByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENT(id));
};

export const getAllStudentsInClassApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_ALL_STUDENTS_IN_CLASS(id));
};
