import { api } from "api/api";
import { AxiosResponse } from "axios";
import { RequestParams } from "types/param.types";
import PositionEndpoints from "../constants/position.endpoints";

export const getPositionsApi = (
    params: RequestParams
  ): Promise<AxiosResponse> => {
    return api.get(PositionEndpoints.GET_POSITIONS(params));
  };