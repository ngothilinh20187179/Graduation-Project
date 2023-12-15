import { AuthPathsEnum } from "features/student_auth/student_auth";
import { router } from "routes/Route";

export const redirectToLogin = () => {
  const redirect = window.location.pathname + window.location.search;
  return router.navigate(AuthPathsEnum.LOGIN, { state: { redirect } });
};
