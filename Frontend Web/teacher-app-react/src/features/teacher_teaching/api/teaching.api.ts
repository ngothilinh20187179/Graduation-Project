import { api } from "api/api";
import { AxiosResponse } from "axios";
import { RequestParams } from "types/param.types";
import TeachingEndpoints from "../constants/teaching.endpoints";

export const getClassesApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_MY_CLASSES(params));
};

export const getClassApi = (id: number): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_CLASS(id));
};
