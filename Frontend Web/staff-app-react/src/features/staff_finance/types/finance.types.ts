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

export type TakeNoteTuition = {
  id: number;
  note: string | null;
}
export type Salary = {
  id: number;
  month: number;
  workDaysInMonth: number;
  totalDaysWorked: number;
  totalHoursWorked: number;
  bonus: number;
  total: number;
  isPaid: boolean;
  createOn: string;
  note: string | null;
};

export interface GetAllSalaryResponse extends PaginationResponse {
  data: Salary[];
}
export type StaffSalary = Salary & {
  staffId: number;
  staffName?: string;
}

export interface GetAllStaffSalaryResponse extends PaginationResponse {
  data: StaffSalary [];
}

export type CreateEditStaffSalary = {
  id?: number;
  month: number;
  workDaysInMonth: number;
  totalDaysWorked: number;
  totalHoursWorked: number;
  bonus: number;
  total: number;
  isPaid: boolean;
  note: string | null;
};

export type TeacherSalary = {
  id: number;
  month: number;
  totalHoursWorked: number;
  bonus: number;
  total: number;
  isPaid: boolean;
  createdOn: string;
  note: string | null;  
  teacherId: number;
  teacherName?: string;
};

export type CreateEditTeacherSalary = {
  id?: number;
  month: number;
  totalHoursWorked: number;
  bonus: number;
  total: number;
  isPaid: boolean;
  note: string | null;  
  teacherId: number;
};

export interface GetAllTeacherSalaryResponse extends PaginationResponse {
  data: TeacherSalary [];
}

export interface FinanceState {
  spendings: GetAllSpendingsResponse | null;
  spending: Spending | null;
  studentTuition: GetAllStudentTuitionResponse | null;
  salary: GetAllSalaryResponse | null;
  staffSalaries: GetAllStaffSalaryResponse | null;
  staffSalaryDetail: StaffSalary | null;
  teacherSalaries: GetAllTeacherSalaryResponse | null;
  teacherSalaryDetail: TeacherSalary | null;
}
