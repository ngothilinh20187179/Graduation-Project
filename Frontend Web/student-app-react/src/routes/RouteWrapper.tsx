import DefaultLayout from "components/Layout/DefaultLayout/DefaultLayout";
import { Route } from "react-router-dom";
import {
  RouteComponent,
  RouteItem,
  RouteWrapperConfig,
} from "types/route.types";

export const routeWrapper = (
  { id, path, component }: RouteItem,
  { isPrivateRoutes }: RouteWrapperConfig | undefined = {}
) => {
  const Component = component as RouteComponent;

  return (
    <Route
      key={id}
      path={path}
      element={
        isPrivateRoutes ? (
          <DefaultLayout>
            <Component />
          </DefaultLayout>
        ) : (
          <Component />
        )
      }
    />
  );
};
