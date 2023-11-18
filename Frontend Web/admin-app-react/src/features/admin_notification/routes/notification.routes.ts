import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { NotificationRoutePaths } from "../constants/notification.paths";


const NOTIFICATION_SCREEN: RouteItem = {
  id: "admin-notification",
  path: NotificationRoutePaths.NOTIFICATION,
  component: lazy(() => import("../screens/NotificationScreen/NotificationScreen")),
}; 

const RECEIVED_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "admin-received-notifications",
  path: NotificationRoutePaths.RECEIVED_NOTIFICATIONS,
  component: lazy(() => import("../screens/ReceivedNotificationsScreen/ReceivedNotificationsScreen")),
}; 

const SENT_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "admin-sent-notifications",
  path: NotificationRoutePaths.SENT_NOTIFICATIONS,
  component: lazy(() => import("../screens/SentNotificationsScreen/SentNotificationsScreen")),
}; 

const STARRED_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "admin-starred-notifications",
  path: NotificationRoutePaths.STARRED_NOTIFICATIONS,
  component: lazy(() => import("../screens//StarredNotificationsScreen/StarredNotificationsScreen")),
}; 

export const NOTIFICATION_ROUTES = [
  NOTIFICATION_SCREEN,
  STARRED_NOTIFICATIONS_SCREEN,
  SENT_NOTIFICATIONS_SCREEN,
  RECEIVED_NOTIFICATIONS_SCREEN
];
