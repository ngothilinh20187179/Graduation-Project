import { RequestParams } from "types/param.types";

const PositionEndpoints = {
  GET_POSITIONS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/positions?page=${page}&pageSize=${pageSize}`;
    }
    return `/positions?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_POSITION: (id: number) => `/position/${id}`,
  CREATE_POSITION: () => `/create-position`,
  UPDATE_POSITION: (id: number) =>  `/update-position/${id}`,
  GET_LIST_POSITION: () => `/position_list`,
  GET_LIST_PERMISSION: () => `/permissions`,
  GET_PERMISSIONID_BY_POSITIONID: (id: number) => `/permissionIds-by-positionId/${id}`,
  DECENTRALIZE_AUTHORITY: (id: number) => `/decentralize-authority/${id}`,
};

export default PositionEndpoints;
