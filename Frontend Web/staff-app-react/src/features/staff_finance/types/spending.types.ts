import { PaginationResponse } from "types/pagination.types";
import { SpendingStatusType } from "../staff_finance";
import { BasicUserInfo } from "features/staff_users/staff_users";
import { Class } from "features/staff_classes/staff_classes";

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

export type StudentTuition = {
  id: number;
  isPaidTuition: boolean;
  note: string | null;
  studentId: number;
  classId: number;
  studentInfo: BasicUserInfo;
  classInfo: Class;
}

export interface GetAllStudentTuitionResponse extends PaginationResponse {
  data: StudentTuition[];
}

export interface FinanceState {
  spendings: GetAllSpendingsResponse | null;
  spending: Spending | null;
  studentTuition: GetAllStudentTuitionResponse | null;
}
