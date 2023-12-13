import { SpendingStatusType } from "features/admin_spending/admin_spending";

export type RequestParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    isMarked?: boolean;
    spendingStatus?: SpendingStatusType;
};