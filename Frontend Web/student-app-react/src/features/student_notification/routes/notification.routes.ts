import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { NotificationRoutePaths } from "../constants/notification.paths";


const NOTIFICATION_SCREEN: RouteItem = {
  id: "student-notification",
  path: NotificationRoutePaths.NOTIFICATION,
  component: lazy(() => import("../screens/NotificationScreen/NotificationScreen")),
}; 

export const NOTIFICATION_ROUTES = [
  NOTIFICATION_SCREEN,
];
