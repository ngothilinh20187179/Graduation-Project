import { AxiosResponse } from "axios";
import { api } from "api/api";
import ClassesEndpoints from "../constants/classes.endpoints";
import { RequestParams } from "types/param.types";
import { Subject } from "../admin_classes";

export const getSubjectsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_SUBJECTS(params));
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