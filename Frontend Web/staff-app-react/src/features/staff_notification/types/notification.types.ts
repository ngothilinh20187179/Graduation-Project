import { PaginationResponse } from "types/pagination.types";
import { ReadStatusType } from "../staff_notification";
import { UserAvatar } from "features/staff_users/staff_users";
import { RoleType } from "features/staff_auth/staff_auth";

export type ReceivedNotification = {
    id: number;
    title: string;
    content: string;
    createOn: string;
    status: ReadStatusType;
    isMarkedReceiverNoti: boolean;
}

export type SentNotification = {
    id: number;
    title: string;
    content: string;
    createOn: string;
    isMarkedSenderNoti: boolean;
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

export type SentNotificationDetail = SentNotification & {
    receiver: UserNotification
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

export interface GetAllSentNotificationDetail extends PaginationResponse {
    data: SentNotification[];
}

export interface NotificationState {
    receivedNotifications: GetAllReceivedNotifications | null;
    receiversNotification: GetAllReceiversNotification | null;
    receivedNotificationDetail: ReceivedNotificationDetail | null;
    sentNotificationDetail: SentNotificationDetail | null;
    sentNotifications: GetAllSentNotificationDetail | null;
}