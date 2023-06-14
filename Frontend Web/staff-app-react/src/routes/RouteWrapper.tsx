import { Route } from "react-router-dom";
import { RouteComponent, RouteItem } from "types/route.types";

export const routeWrapper = (
  { id, path, component }: RouteItem,
) => {
  const Component = component as RouteComponent;

  return (
    <Route
      key={id}
      path={path}
      element={<Component />}
    />
  );
};
