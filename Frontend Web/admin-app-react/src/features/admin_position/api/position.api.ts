import { api } from "api/api";
import { AxiosResponse } from "axios";
import { RequestParams } from "types/param.types";
import PositionEndpoints from "../constants/position.endpoints";
import { Position } from "../admin_position";

export const getPositionsApi = (
  params: RequestParams
): Promise<AxiosResponse> => {
  return api.get(PositionEndpoints.GET_POSITIONS(params));
};

export const createPositionApi = (data: Position): Promise<AxiosResponse> => {
  return api.post(PositionEndpoints.CREATE_POSITION(), data);
};

export const getPositionApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(PositionEndpoints.GET_POSITION(id));
};

export const updatePositionApi = (
  id: number,
  data: Position
): Promise<AxiosResponse> => {
  return api.put(PositionEndpoints.UPDATE_POSITION(id), data);
};
