import { RequestParams } from "types/param.types";

const FinanceEndpoints = {
  GET_SALARY: ({ page, pageSize, isPaid }: RequestParams) => {
    if (isPaid === undefined || isPaid === null) {
      return `/teacher-salaries?page=${page}&pageSize=${pageSize}`;
    }
    return `/teacher-salaries?isPaid=${isPaid}&page=${page}&pageSize=${pageSize}`;
  },
};

export default FinanceEndpoints;
