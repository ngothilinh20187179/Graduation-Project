import axios, { AxiosError, AxiosResponse } from "axios";
import { AXIOS_ERROR_CODE, TIME_OUT_API } from "constants/api.constants";
import { router } from "routes/Route";
import { AuthPathsEnum } from "features/student_auth/student_auth";
import { redirectToLogin } from "helpers/route.helper";
import { ToastNotification } from "components/ToastNotification";
import mess from "messages/messages.json";
import store from "redux/store";
import { clearUser, refreshToken } from "features/student_auth/redux/auth.slice";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const responseInterceptor = (response: AxiosResponse) => {
  return response;
};

const errorInterceptor = async (axiosError: AxiosError) => {
  if (axiosError.code === AXIOS_ERROR_CODE.TIME_OUT) {
    ToastNotification({
      type: "error",
      message: mess.fe_2,
    });
    return Promise.reject(axiosError);
  }
  if (axiosError.code === AXIOS_ERROR_CODE.ERR_NETWORK) {
    router.navigate(AuthPathsEnum.REFUSED_CONNECTION);
  }
  const statusCode = axiosError?.response?.status;

  switch (statusCode) {
    case 400: // Bad request
    case 409: // Conflict
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore:next-line
      const { message } = axiosError.response?.data;
      if (message) {
        ToastNotification({
          type: "error",
          message: message,
        });
      }
      break;
    case 401: // Unauthorized
      store.dispatch(clearUser());
      redirectToLogin();
      break;
    case 403: //
      router.navigate(AuthPathsEnum.FORBIDDEN);
      break;
    case 404: // Not Found
      router.navigate(AuthPathsEnum.NOT_FOUND);
      break;
    case 500: // Server error
      ToastNotification({
        type: "error",
        message: mess.fe_3,
      });
      break;
    default:
  }
  return Promise.reject(axiosError);
};

const refreshAuthLogic = async () => {
  const tokenInfo = store.getState().authentication.tokenInfo;
  if (tokenInfo) {
    return store
      .dispatch(
        refreshToken({
          accessToken: tokenInfo.accessToken,
          refreshToken: tokenInfo.refreshToken,
        })
      )
      .unwrap()
      .then(() => {
        return Promise.resolve();
      })
      .catch(() => {
        redirectToLogin();
        return Promise.reject();
      });
  }
  store.dispatch(clearUser());
  redirectToLogin();
  return Promise.reject();
};

export const api = axios.create({
  baseURL: `https://localhost:7054/api/`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: TIME_OUT_API,
});

createAuthRefreshInterceptor(api, refreshAuthLogic);
api.interceptors.request.use(
  (config) => {
    const access_token = store.getState().authentication.tokenInfo?.accessToken;
    if (access_token) {
      config.headers["Authorization"] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(responseInterceptor, errorInterceptor);
