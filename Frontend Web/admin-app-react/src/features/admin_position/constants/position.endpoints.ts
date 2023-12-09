import { RequestParams } from "types/param.types";

const PositionEndpoints = {
  GET_POSITIONS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/positions?page=${page}&pageSize=${pageSize}`;
    }
    return `/positions?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_POSITION: (id: number) => `/position/${id}`,
  CREATE_POSITION: () => `create-position`,
  UPDATE_POSITION: (id: number) =>  `update-position/${id}`,
};

export default PositionEndpoints;
