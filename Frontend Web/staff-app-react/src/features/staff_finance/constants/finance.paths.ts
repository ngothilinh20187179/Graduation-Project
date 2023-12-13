export const FinanceRoutePaths = {
  FINANCE: "/finance",
  SPENDING: "/spendings",
  EDIT_SPENDING: "/spendings/update/:id",
  CREATE_SPENDING: "/spendings/create",
};

export const FinancePaths = {
  FINANCE: () => "/finance",
  SPENDING: () => "/spendings",
  EDIT_SPENDING: (id: number) => `/spendings/update/${id}`,
  CREATE_SPENDING: () => "/spendings/create",
};
