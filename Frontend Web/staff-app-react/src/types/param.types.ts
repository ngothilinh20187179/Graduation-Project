import { SpendingStatusType } from "features/staff_finance/staff_finance";

export type RequestParams = {
    page?: number;
    pageSize?: number;
    search?: string;
    isMarked?: boolean;
    spendingStatus?: SpendingStatusType | null;
    isPaidTuition?: boolean | null;
    isPaid?: boolean | null;
};