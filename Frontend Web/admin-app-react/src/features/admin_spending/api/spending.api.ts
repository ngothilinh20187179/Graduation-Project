import { AxiosResponse } from "axios";
import { api } from "api/api";
import { RequestParams } from "types/param.types";
import SpendingEndpoints from "../constants/spending.endpoints";
import { SpendingStatusType } from "../admin_spending";

export const getSpendingsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(SpendingEndpoints.GET_SPENDINGS(params));
};

export const acceptOrRejectSpendingApi = (
  id: number,
  status: SpendingStatusType
): Promise<AxiosResponse> => {
  return api.put(SpendingEndpoints.ACCEPT_OR_REJECT_SPENDING(id), status);
};

