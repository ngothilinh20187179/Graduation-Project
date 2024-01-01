export type RequestParams = {
    id?: number;
    page?: number;
    pageSize?: number;
    search?: string;
    isMarked?: boolean;
    isPaid?: boolean | null;
};