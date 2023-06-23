import { AxiosResponse } from "axios";
import { api } from "api/api";
import ClassesEndpoints from "../constants/classes.endpoints";

export const getSubjectsApi = (): Promise<AxiosResponse> => {
  return api.get(ClassesEndpoints.GET_SUBJECTS());
};
