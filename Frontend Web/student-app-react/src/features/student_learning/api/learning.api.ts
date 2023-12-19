import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import LearningEndpoints from "../constants/learning.endpoints";

export const getAllOnlineTestScoresApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.GET_MY_ONLINE_TEST_SCORES(params));
};

export const getAllOfflineTestScoresApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.GET_MY_OFFLINE_TEST_SCORES(params));
};

export const getMyTestsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.GET_MY_TESTS(params));
};

export const getClassesApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.GET_MY_CLASSES(params));
};

export const getClassApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.GET_MY_CLASS_DETAIL(id));
};