import { api } from "api/api";
import { AxiosResponse } from "axios";
import { RequestParams } from "types/param.types";
import TeachingEndpoints from "../constants/teaching.endpoints";
import { EnterTranscript } from "../teaching.types";

export const getClassesApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_MY_CLASSES(params));
};

export const getClassApi = (id: number): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_CLASS(id));
};

export const getAllOnlineTestScoresApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_MY_ONLINE_TEST_SCORES(params));
};

export const getAllOfflineTestScoresApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_MY_OFFLINE_TEST_SCORES(params));
};

export const updateMarkApi = (
  id: number,
  point: number
): Promise<AxiosResponse> => {
  return api.put(TeachingEndpoints.UPDATE_OFFLINE_TEST_SCORE(id), point);
};

export const getMyTeachingScheduleApi = (): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.MY_TEACHING_SCHEDULE());
};

export const getQuizzesApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_QUIZZES(params));
};

export const getQuizApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(TeachingEndpoints.GET_QUIZZ(id));
};

export const deleteQuizApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(TeachingEndpoints.DELETE_QUIZ(id));
};

export const enterTranscriptApi = (
  data: EnterTranscript
): Promise<AxiosResponse> => {
  return api.post(TeachingEndpoints.ENTER_TRANSCRIPT(), data);
};