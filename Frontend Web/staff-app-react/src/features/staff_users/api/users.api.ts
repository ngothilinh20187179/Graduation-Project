import { AxiosResponse } from "axios";
import UsersEndpoints from "../constants/users.endpoints";
import { api } from "api/api";

export const getUserByIdApi = (id: number): Promise<AxiosResponse> => {
  return api.get(UsersEndpoints.GET_USER(id));
};
