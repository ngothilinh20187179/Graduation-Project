import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import SpendingEndpoints from "../constants/finance.endpoints";
import { SpendingStatusType } from "../staff_finance";
import { CreateEditSpending } from "../types/spending.types";

export const getSpendingsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(SpendingEndpoints.GET_SPENDINGS(params));
};

export const getSpendingByIdApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(SpendingEndpoints.GET_SPENDING(id));
};

export const createSpendingApi = (
  data: CreateEditSpending
): Promise<AxiosResponse> => {
  return api.post(SpendingEndpoints.CREATE_SPENDING(), data);
};

export const updateSpendingApi = (
  id: number,
  data: CreateEditSpending
): Promise<AxiosResponse> => {
  return api.put(SpendingEndpoints.UPDATE_SPENDING(id), data);
};

export const acceptOrRejectSpendingApi = (
  id: number,
  status: SpendingStatusType
): Promise<AxiosResponse> => {
  return api.put(SpendingEndpoints.ACCEPT_OR_REJECT_SPENDING(id), status);
};

export const deleteSpendingApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(SpendingEndpoints.DELETE_SPENDING(id));
};

export const getStudentTuitionInformationApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(SpendingEndpoints.GET_STUDENT_TUITION(params));
};