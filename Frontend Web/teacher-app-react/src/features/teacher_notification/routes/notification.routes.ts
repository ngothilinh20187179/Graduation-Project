import { lazy } from "react";
import { RouteItem } from "types/route.types";
import { NotificationRoutePaths } from "../constants/notification.paths";


const NOTIFICATION_SCREEN: RouteItem = {
  id: "teacher-notification",
  path: NotificationRoutePaths.NOTIFICATION,
  component: lazy(() => import("../screens/NotificationScreen/NotificationScreen")),
}; 

const RECEIVED_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "teacher-received-notifications",
  path: NotificationRoutePaths.RECEIVED_NOTIFICATIONS,
  component: lazy(() => import("../screens/ReceivedNotificationsScreen/ReceivedNotificationsScreen")),
}; 

const SENT_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "teacher-sent-notifications",
  path: NotificationRoutePaths.SENT_NOTIFICATIONS,
  component: lazy(() => import("../screens/SentNotificationsScreen/SentNotificationsScreen")),
}; 

const STARRED_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "teacher-starred-notifications",
  path: NotificationRoutePaths.STARRED_NOTIFICATIONS,
  component: lazy(() => import("../screens/StarredNotificationsScreen/StarredNotificationsScreen")),
}; 

const CREATE_NOTIFICATIONS_SCREEN: RouteItem = {
  id: "teacher-create-notifications",
  path: NotificationRoutePaths.CREATE_NOTIFICATIONS,
  component: lazy(() => import("../screens/CreateNotificationScreen/CreateNotificationScreen")),
}; 

export const NOTIFICATION_ROUTES = [
  NOTIFICATION_SCREEN,
  STARRED_NOTIFICATIONS_SCREEN,
  SENT_NOTIFICATIONS_SCREEN,
  RECEIVED_NOTIFICATIONS_SCREEN,
  CREATE_NOTIFICATIONS_SCREEN
];
