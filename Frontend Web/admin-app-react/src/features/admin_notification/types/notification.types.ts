import { PaginationResponse } from "types/pagination.types";
import { ReadStatusType } from "../admin_notification";
import { RoleType } from "features/admin_auth/admin_auth";
import { UserAvatar } from "features/admin_users/admin_users";

export type ReceivedNotification = {
    id: number;
    title: string;
    content: string;
    createOn: string;
    status: ReadStatusType;
    isMarkedReceiverNoti: boolean;
}

export type UserNotification = {
    id: number;
    firstName: string;
    lastName: string;
    avatar: UserAvatar | null;
    role: RoleType;
}

export type ReceivedNotificationDetail = ReceivedNotification & {
    sender: UserNotification
};

export type ReceiverNotification = {
    id: number;
    firstName: string;
    lastName: string;
    role: RoleType;
}

export type CreateNotification = {
    title: string;
    content: string;
    receivers: number[];
}

export interface GetAllReceivedNotifications extends PaginationResponse {
    data: ReceivedNotification[];
}

export interface GetAllReceiversNotification extends PaginationResponse {
    data: ReceiverNotification[];
}

export interface NotificationState {
    receivedNotifications: GetAllReceivedNotifications | null;
    receiversNotification: GetAllReceiversNotification | null;
    receivedNotificationDetail: ReceivedNotificationDetail | null;
}