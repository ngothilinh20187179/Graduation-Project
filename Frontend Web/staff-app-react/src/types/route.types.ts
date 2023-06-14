import { ComponentType } from "react";

export type RouteComponent = ComponentType<any>;

export type RouteItem = {
  id: string;
  path: string;
  component: RouteComponent;
};
