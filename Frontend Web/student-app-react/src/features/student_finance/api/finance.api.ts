import { AxiosResponse } from "axios";
import { api } from "api/api";
import FinanceEndpoints from "../constants/finance.endpoints";

export const getMyTuitionDebtInformationApi = (): Promise<AxiosResponse> => {
  return api.get(FinanceEndpoints.GET_MY_TUITION_DEBT());
};
