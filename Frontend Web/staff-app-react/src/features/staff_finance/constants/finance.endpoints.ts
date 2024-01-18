import { RequestParams } from "types/param.types";

const FinanceEndpoints = {
  GET_SPENDINGS: ({ page, pageSize, spendingStatus }: RequestParams) => {
    if (spendingStatus === undefined || spendingStatus === null) {
      return `/spendings?page=${page}&pageSize=${pageSize}`;
    }
    return `/spendings?spendingStatus=${spendingStatus}&page=${page}&pageSize=${pageSize}`;
  },
  GET_SPENDING: (id: number) => `/spending/${id}`,
  CREATE_SPENDING: () => `/create-spending`,
  UPDATE_SPENDING: (id: number) =>  `/update-spending/${id}`,
  ACCEPT_OR_REJECT_SPENDING: (id: number) => `/accept-or-reject-spending/${id}`,
  DELETE_SPENDING: (id: number) => `/remove-spending/${id}`,
  GET_STUDENT_TUITION: ({isPaidTuition, page, pageSize }: RequestParams) => {
    if (isPaidTuition === undefined || isPaidTuition === null) {
      return `/student-tuition?page=${page}&pageSize=${pageSize}`;
    }
    return `/student-tuition?isPaidTuition=${isPaidTuition}&page=${page}&pageSize=${pageSize}`;
  },
  CONFIRM_PAYMENT: () =>  `/confirm-payment`,
  TAKE_NOTE_TUITION: (id: number) =>  `/take-note-student-tuition/${id}`,
  GET_MY_SALARY: ({ page, pageSize, isPaid }: RequestParams) => {
    if (isPaid === undefined || isPaid === null) {
      return `/staff-salaries?page=${page}&pageSize=${pageSize}`;
    }
    return `/staff-salaries?isPaid=${isPaid}&page=${page}&pageSize=${pageSize}`;
  },
  GET_STAFF_SALARY: ({ page, pageSize, isPaid }: RequestParams) => {
    if (isPaid === undefined || isPaid === null) {
      return `/all-staff-salaries?page=${page}&pageSize=${pageSize}`;
    }
    return `/all-staff-salaries?isPaid=${isPaid}&page=${page}&pageSize=${pageSize}`;
  },
  GET_STAFF_SALARY_BY_ID: (id: number) => `/staff-salary/${id}`,
  GET_TEACHER_SALARY: ({ page, pageSize, isPaid }: RequestParams) => {
    if (isPaid === undefined || isPaid === null) {
      return `/all-teacher-salaries?page=${page}&pageSize=${pageSize}`;
    }
    return `/all-teacher-salaries?isPaid=${isPaid}&page=${page}&pageSize=${pageSize}`;
  },
  CREATE_TEACHER_SALARY: () => `/create-teacher-salary`,
  GET_TEACHER_SALARY_BY_ID: (id: number) => `/teacher-salary/${id}`,
  UPDATE_TEACHER_SALARY: (id: number) =>  `/update-teacher-salary/${id}`,
  DELETE_TEACHER_SALARY: (id: number) => `/remove-teacher-salary/${id}`,
  DELETE_STAFF_SALARY: (id: number) => `/remove-staff-salary/${id}`,
  CREATE_STAFF_SALARY: () => `/create-staff-salary`,
  UPDATE_STAFF_SALARY: (id: number) =>  `/update-staff-salary/${id}`,
};

export default FinanceEndpoints;
