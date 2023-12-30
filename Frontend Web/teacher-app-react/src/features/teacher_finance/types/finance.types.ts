import { PaginationResponse } from "types/pagination.types";

export type Salary = {
  id: number;
  month: number;
  totalHoursWorked: number;
  bonus: number;
  total: number;
  isPaid: boolean;
  createdOn: string;
  note: string | null;
};

export interface GetAllSalaryResponse extends PaginationResponse {
  data: Salary[];
}

export interface FinanceState {
  salary: GetAllSalaryResponse | null;
}
