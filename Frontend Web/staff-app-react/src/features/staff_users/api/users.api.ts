import { AxiosResponse } from "axios";
import UsersEndpoints from "../constants/users.endpoints";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import { CreateEditStudentInfo, CreateEditTeacherInfo } from "../staff_users";

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_MY_AVATAR());
};

export const getStaffsApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STAFFS(params));
};

export const getStaffsListApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STAFFS_LIST());
};

export const getStaffByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STAFF(id));
};

export const getTeachersApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_TEACHERS(params));
};

export const getTeachersListApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_TEACHERS_LIST());
};

export const getTeacherByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_TEACHER(id));
};

export const updateTeacherInfoApi = (
  id: number,
  data: CreateEditTeacherInfo
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.EDIT_TEACHER(id), data);
};

export const createTeacherInfoApi = (
  data: CreateEditTeacherInfo
): Promise<AxiosResponse> => {
  return api.post(UsersEndpoints.CREATE_TEACHER(), data);
};

export const getStudentsApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENTS(params));
};

export const getStudentByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENT(id));
};

export const getStudentsInClassApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENTS_IN_CLASS(id));
};

export const updateStudentInfoApi = (
  id: number,
  data: CreateEditStudentInfo
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.EDIT_STUDENT(id), data);
};

export const createStudentInfoApi = (
  data: CreateEditStudentInfo
): Promise<AxiosResponse> => {
  return api.post(UsersEndpoints.CREATE_STUDENT(), data);
};

export const getStudentsAvailableApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STUDENTS_NOT_IN_CLASS(id));
};
