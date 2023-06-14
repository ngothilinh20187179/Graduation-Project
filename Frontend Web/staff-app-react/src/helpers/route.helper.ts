import { AuthPathsEnum } from "features/staff_auth/staff_auth";
import { router } from "routes/Route";

export const redirectToLogin = () => {
  const redirect = window.location.pathname + window.location.search;
  return router.navigate(AuthPathsEnum.LOGIN, { state: { redirect } });
};
