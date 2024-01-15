import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import LearningEndpoints from "../constants/learning.endpoints";
import { QuizSubmit } from "../types/learning.types";

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

export const getQuizApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.GET_THE_TEST(id));
};

export const submitExamApi = (data: QuizSubmit): Promise<AxiosResponse> => {
  return api.post(LearningEndpoints.SUBMIT_QUIZ(), data);
};

export const getMyLearningScheduleApi = (): Promise<AxiosResponse> => {
  return api.get(LearningEndpoints.MY_LEARNING_SCHEDULE());
};