export enum ApiStatusCodes {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
}

export const TIME_OUT_API = 15000;

export const AXIOS_ERROR_CODE = {
  TIME_OUT: "ECONNABORTED",
};
