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

export const getPositionListApi = (): Promise<AxiosResponse> => {
  return api.get(PositionEndpoints.GET_LIST_POSITION());
};

export const getPermissionListApi = (): Promise<AxiosResponse> => {
  return api.get(PositionEndpoints.GET_LIST_PERMISSION());
};

export const getPermissionIdListByPositionIdApi = (
  id: number
): Promise<AxiosResponse> => {
  return api.get(PositionEndpoints.GET_PERMISSIONID_BY_POSITIONID(id));
};

export const decentralizeAuthorityApi = (
  id: number,
  listPermissionId: number[]
): Promise<AxiosResponse> => {
  return api.put(PositionEndpoints.DECENTRALIZE_AUTHORITY(id), listPermissionId);
};