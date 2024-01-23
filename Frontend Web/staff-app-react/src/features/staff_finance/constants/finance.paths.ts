export const FinanceRoutePaths = {
  FINANCE: "/finance",
  SPENDING: "/spendings",
  EDIT_SPENDING: "/spendings/update/:id",
  CREATE_SPENDING: "/spendings/create",
  TUITION: "/student-tuition",
  MY_SALARY: "/my-salary",
  STAFF_SALARY: "/staff-salary",
  TEACHER_SALARY: "/teacher-salary",
  CREATE_TEACHER_SALARY: "/teacher-salary/create",
  EDIT_TEACHER_SALARY: "/teacher-salary/update/:id",
  CREATE_STAFF_SALARY: "/staff-salary/create",
  EDIT_STAFF_SALARY: "/staff-salary/update/:id"
};

export const FinancePaths = {
  FINANCE: () => "/finance",
  SPENDING: () => "/spendings",
  EDIT_SPENDING: (id: number) => `/spendings/update/${id}`,
  CREATE_SPENDING: () => "/spendings/create",
  TUITION: () => "/student-tuition",
  MY_SALARY: () => "/my-salary",
  STAFF_SALARY: () => "/staff-salary",
  TEACHER_SALARY: () => "/teacher-salary",
  CREATE_TEACHER_SALARY: () => "/teacher-salary/create",
  EDIT_TEACHER_SALARY: (id: number) => `/teacher-salary/update/${id}`,
  CREATE_STAFF_SALARY: () => "/staff-salary/create",
  EDIT_STAFF_SALARY: (id: number) => `/staff-salary/update/${id}`
};
