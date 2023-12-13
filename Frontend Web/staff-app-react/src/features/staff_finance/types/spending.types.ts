import { PaginationResponse } from "types/pagination.types";
import { SpendingStatusType } from "../staff_finance";

export type Spending = {
  id: number;
  spendOn: string;
  budget: number;
  description: string | null;
  status: SpendingStatusType;
  createdOn: string;
  staffId: number;
  author?: string;
};

export type CreateEditSpending = {
  id?: number;
  spendOn: string;
  budget: number;
  description: string | null;
};

export interface GetAllSpendingsResponse extends PaginationResponse {
  data: Spending[];
}

export type AcceptOrRejectSpending = {
  id: number;
  status: SpendingStatusType;
}

export interface FinanceState {
  spendings: GetAllSpendingsResponse | null;
  spending: Spending | null;
}
