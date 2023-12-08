import { AxiosResponse } from "axios";
import { api } from "api/api";
import ClassesEndpoints from "../constants/classes.endpoints";
import { RequestParams } from "types/param.types";
import { CreateEditClassInfo, Room, Subject } from "../staff_classes";

export const getClassesApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_CLASSES(params));
};

export const getClassApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_CLASS(id));
};

export const createClassInfoApi = (
  data: CreateEditClassInfo
): Promise<AxiosResponse> => {
  return api.post(ClassesEndpoints.CREATE_CLASS_INFO(), data);
};

export const getSubjectsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_SUBJECTS(params));
};

export const getOpenSubjectsApi = (): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_OPEN_SUBJECTS());
};

export const getSubjectApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_SUBJECT(id));
};

export const createSubjectApi = (
  data: Subject
): Promise<AxiosResponse> => {
  return api.post(ClassesEndpoints.CREATE_SUBJECT(), data);
};

export const updateSubjectApi = (
  id: number,
  data: Subject
): Promise<AxiosResponse> => {
  return api.put(ClassesEndpoints.UPDATE_SUBJECT(id), data);
};

export const deleteSubjectApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(ClassesEndpoints.DELETE_SUBJECT(id));
};

export const getRoomsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_ROOMS(params));
};

export const getRoomApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_ROOM(id));
};

export const createRoomApi = (
  data: Room
): Promise<AxiosResponse> => {
  return api.post(ClassesEndpoints.CREATE_ROOM(), data);
};

export const updateRoomApi = (
  id: number,
  data: Room
): Promise<AxiosResponse> => {
  return api.put(ClassesEndpoints.UPDATE_ROOM(id), data);
};

export const deleteRoomApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(ClassesEndpoints.DELETE_ROOM(id));
};