import { PaginationResponse } from "types/pagination.types";
import { SpendingStatusType } from "../admin_spending";

export type Spending = {
  id: number;
  spendOn: string;
  budget: number;
  description: string | null;
  status: SpendingStatusType;
  createdOn: string;
  staffId: number;
  author: string;
};

export interface GetAllSpendingsResponse extends PaginationResponse {
  data: Spending[];
}

export type AcceptOrRejectSpending = {
  id: number;
  status: SpendingStatusType;
}

export interface SpendingState {
  spendings: GetAllSpendingsResponse | null;
}
