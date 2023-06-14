import { AxiosResponse } from "axios";
import AuthEndpoints from "../constants/auth.endpoints";
import { api } from "api/api";
import { LoginRequestBody, TokenInfo } from "../types/auth.types";

export const loginApi = (data: LoginRequestBody): Promise<AxiosResponse> => {
  return api.post(AuthEndpoints.LOGIN(), data);
};

export const refreshTokenApi = (data: TokenInfo): Promise<AxiosResponse> => {
  return api.post(AuthEndpoints.REFRESH_TOKEN(), data);
};
