import { RequestParams } from "types/param.types";

const PositionEndpoints = {
  GET_POSITIONS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/positions?page=${page}&pageSize=${pageSize}`;
    }
    return `/positions?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
};

export default PositionEndpoints;
