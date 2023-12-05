import NotFound from "components/Forbidden";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import { FORBIDDEN_ROUTE, LIST_PRIVATE_ROUTES, LIST_PUBLIC_ROUTES, REFUSED_CONNECTION_ROUTE } from "./routes.config";
import Forbidden from "components/Forbidden";
import { routeWrapper } from "./RouteWrapper";
import RefusedConnection from "components/RefusedConnection";
  
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<NotFound />}>
        <Route>
          {LIST_PUBLIC_ROUTES.map(route => routeWrapper(route))}
          {LIST_PRIVATE_ROUTES.map(route => 
            routeWrapper(route, { isPrivateRoutes: true })
          )}
        </Route>
        <Route 
          path={FORBIDDEN_ROUTE}
          element={<Forbidden />}
        />
        <Route 
          path={REFUSED_CONNECTION_ROUTE}
          element={<RefusedConnection />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </>
  )
);
  