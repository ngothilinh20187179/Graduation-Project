import NotFound from "components/Forbidden";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import { FORBIDDEN_ROUTE, LIST_ROUTES } from "./routes.config";
import Forbidden from "components/Forbidden";
import { routeWrapper } from "./RouteWrapper";
  
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<NotFound />}>
        <Route>
          {LIST_ROUTES.map(route => routeWrapper(route))}
        </Route>
        <Route 
          path={FORBIDDEN_ROUTE}
          element={<Forbidden />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Route>
    </>
  )
);
  