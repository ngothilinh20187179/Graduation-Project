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
