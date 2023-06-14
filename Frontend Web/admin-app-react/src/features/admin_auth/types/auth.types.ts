export type LoginRequestBody = {
  loginName: string;
  password: string;
};

export type TokenInfo = {
  refreshToken: string;
  accessToken: string;
};

export interface AuthState {
  tokenInfo: TokenInfo | null;
}
