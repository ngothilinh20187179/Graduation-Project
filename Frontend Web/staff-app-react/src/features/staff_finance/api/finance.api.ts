import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import { SpendingStatusType } from "../staff_finance";
import { CreateEditSpending, CreateEditStaffSalary, CreateEditTeacherSalary } from "../types/finance.types";
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

export const getAllStaffSalariesApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_STAFF_SALARY(params));
};

export const getAllTeacherSalariesApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_TEACHER_SALARY(params));
};

export const getStaffSalaryByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_STAFF_SALARY_BY_ID(id));
};

export const createStaffSalaryApi = (
  data: CreateEditStaffSalary
): Promise<AxiosResponse> => {
  return api.post(FinanceEndpoints.CREATE_STAFF_SALARY(), data);
};

export const createTeacherSalaryApi = (
  data: CreateEditTeacherSalary
): Promise<AxiosResponse> => {
  return api.post(FinanceEndpoints.CREATE_TEACHER_SALARY(), data);
};

export const getTeacherSalaryByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_TEACHER_SALARY_BY_ID(id));
};

export const editTeacherSalaryApi = (
  id: number,
  data: CreateEditTeacherSalary
): Promise<AxiosResponse> => {
  return api.put(FinanceEndpoints.UPDATE_TEACHER_SALARY(id), data);
};

export const deleteTeacherSalaryApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(FinanceEndpoints.DELETE_TEACHER_SALARY(id));
};

export const deleteStaffSalaryApi = (id: number): Promise<AxiosResponse> => {
  return api.delete(FinanceEndpoints.DELETE_STAFF_SALARY(id));
};

export const editStaffSalaryApi = (
  id: number,
  data: CreateEditStaffSalary
): Promise<AxiosResponse> => {
  return api.put(FinanceEndpoints.UPDATE_STAFF_SALARY(id), data);
};
