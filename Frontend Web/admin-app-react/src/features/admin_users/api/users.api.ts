import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import { UserStatusType } from "../constants/users.constants";
import UsersEndpoints from "../constants/users.endpoints";
import { AdminInformation, CreateEditStaffInfo, CreateEditStudentInfo, CreateEditTeacherInfo } from "../admin_users";

export const getAdminByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_ADMIN(id));
};

export const getMyAvatarApi = (): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_MY_AVATAR());
};

export const getAdminsApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_ADMINS(params));
};

export const restricteAccountApi = (
  id: number,
  userStatusType: UserStatusType
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.RESTRICTE_ACCOUNT(id), userStatusType);
};

export const updateAdminInfoApi = (
  id: number,
  data: AdminInformation
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.EDIT_ADMIN(id), data);
};

export const createAdminInfoApi = (
  data: AdminInformation
): Promise<AxiosResponse> => {
  return api.post(UsersEndpoints.CREATE_ADMIN(), data);
};

export const getStaffsApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STAFFS(params));
};

export const getStaffByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_STAFF(id));
};

export const createStaffInfoApi = (
  data: CreateEditStaffInfo
): Promise<AxiosResponse> => {
  return api.post(UsersEndpoints.CREATE_STAFF(), data);
};

export const updateStaffInfoApi = (
  id: number,
  data: CreateEditStaffInfo
): Promise<AxiosResponse> => {
  return api.put(UsersEndpoints.EDIT_STAFF(id), data);
};

export const getTeachersApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_TEACHERS(params));
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