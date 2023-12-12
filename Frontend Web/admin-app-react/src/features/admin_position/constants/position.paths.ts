export const PositionRoutePaths = {
  POSITIONS: "/positions",
  EDIT_POSITION: "/positions/edit/:id",
  CREATE_POSITION: "/positions/create",
  DECENTRALIZE_AUTHORITY: "/decentralize-authority/:id",
};

export const PositionPaths = {
  POSITIONS: () => "/positions",
  EDIT_POSITION: (id: number) => `/positions/edit/${id}`,
  CREATE_POSITION: () => "/positions/create",
  DECENTRALIZE_AUTHORITY: (id: number) => `/decentralize-authority/${id}`,
};
