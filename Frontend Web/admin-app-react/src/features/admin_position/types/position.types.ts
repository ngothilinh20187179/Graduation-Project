import { PaginationResponse } from "types/pagination.types";

export type PositionList = {
  id: number;
  name: string;
}

export type PermissionList = {
  id: number;
  name: string;
}

export type Position = {
  id?: number;
  name: string;
  salaryMin: number;
  salaryMax: number;
  hourlyRate: number;
  createdOn?: string;
}

export interface GetAllPositionResponse extends PaginationResponse {
  data: Position[];
}

export interface GetPositionResponse {
  data: Position
}

export type DecentralizeAuthority = {
  id: number;
  listPermissionId: number[];
}

export interface PositionsState {
  positions: GetAllPositionResponse | null;
  position: GetPositionResponse | null;
}
