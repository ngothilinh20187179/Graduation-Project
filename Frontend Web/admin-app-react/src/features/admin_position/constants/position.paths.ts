export const PositionRoutePaths = {
  POSITIONS: "/positions",
  EDIT_POSITION: "/positions/edit/:id",
  CREATE_POSITION: "/positions/create",
};

export const PositionPaths = {
  POSITIONS: () => "/positions",
  EDIT_POSITION: (id: number) => `/positions/edit/${id}`,
  CREATE_POSITION: () => "/positions/create",
};
