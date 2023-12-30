import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import { SpendingStatusType } from "../staff_finance";
import { CreateEditSpending } from "../types/finance.types";
import FinanceEndpoints from "../constants/finance.endpoints";

export const getSpendingsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_SPENDINGS(params));
};

export const getSpendingByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_SPENDING(id));
};

export const createSpendingApi = (
  data: CreateEditSpending
): Promise<AxiosResponse> => {
  return api.post(FinanceEndpoints.CREATE_SPENDING(), data);
};

export const updateSpendingApi = (
  id: number,
  data: CreateEditSpending
): Promise<AxiosResponse> => {
  return api.put(FinanceEndpoints.UPDATE_SPENDING(id), data);
};

export const acceptOrRejectSpendingApi = (
  id: number,
  status: SpendingStatusType
): Promise<AxiosResponse> => {
  return api.put(FinanceEndpoints.ACCEPT_OR_REJECT_SPENDING(id), status);
};

export const deleteSpendingApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(FinanceEndpoints.DELETE_SPENDING(id));
};

export const getStudentTuitionInformationApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_STUDENT_TUITION(params));
};

export const confirmPaymentApi = (id: number): Promise<AxiosResponse> => {
  return api.put(FinanceEndpoints.CONFIRM_PAYMENT(), id);
};

export const takeNoteTuitionApi = (
  id: number,
  note: string | null
): Promise<AxiosResponse> => {
  return api.put(FinanceEndpoints.TAKE_NOTE_TUITION(id), note);
};

export const getMySalaryApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_MY_SALARY(params));
};
