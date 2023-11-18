import { PaginationResponse } from "types/pagination.types";
import { ReadStatusType } from "../admin_notification";

export type ReceivedNotification = {
    id: number;
    title: string;
    content: string;
    createOn: string;
    status: ReadStatusType;
    isMarkedReceiverNoti: boolean;
}

export interface GetAllReceivedNotifications extends PaginationResponse {
    data: ReceivedNotification[];
}

export interface NotificationState {
    receivedNotifications: GetAllReceivedNotifications | null;
}