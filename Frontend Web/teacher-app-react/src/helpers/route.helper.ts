import { AuthPathsEnum } from "features/teacher_auth/teacher_auth";
import { router } from "routes/Route";

export const redirectToLogin = () => {
  const redirect = window.location.pathname + window.location.search;
  return router.navigate(AuthPathsEnum.LOGIN, { state: { redirect } });
};
