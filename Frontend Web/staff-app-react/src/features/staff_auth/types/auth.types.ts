import { RoleType } from "../staff_auth";

export type LoginRequestBody = {
  loginName: string;
  password: string;
  role: RoleType;
};

export type TokenInfo = {
  refreshToken: string;
  accessToken: string;
};

export type LoginResponse = {
  role: RoleType;
  userId: string;
} & TokenInfo;

export interface AuthState {
  tokenInfo: TokenInfo | null;
  role: number | null;
  userId: string | null;
}
