import { PaginationResponse } from "types/pagination.types";
import { ReadStatusType } from "../student_notification";
import { UserAvatar } from "features/student_users/student_users";
import { RoleType } from "features/student_auth/student_auth";

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

export interface GetAllReceivedNotifications extends PaginationResponse {
    data: ReceivedNotification[];
}

export interface NotificationState {
    receivedNotifications: GetAllReceivedNotifications | null;
    receivedNotificationDetail: ReceivedNotificationDetail | null;
}