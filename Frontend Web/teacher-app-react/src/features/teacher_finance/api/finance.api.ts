import { api } from "api/api";
import { AxiosResponse } from "axios";
import { RequestParams } from "types/param.types";
import FinanceEndpoints from "../constants/finance.endpoints";

export const getSalaryApi = (params: RequestParams): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_SALARY(params));
};
