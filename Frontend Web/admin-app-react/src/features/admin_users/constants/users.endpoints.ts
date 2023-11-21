import { RequestParams } from "types/param.types";

const UsersEndpoints = {
  GET_ADMINS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/admins?page=${page}&pageSize=${pageSize}`;
    }
    return `/admins?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_ADMIN: (id: number) => `/admin/${id}`,
  GET_MY_AVATAR: () => `/myavatar`,
  RESTRICTE_ACCOUNT: (id: number) => `/restricted-user/${id}`,
  EDIT_ADMIN: (id: number) => `/edit-admin/${id}`,
  CREATE_ADMIN: () => `/create-admin`,
  GET_STAFFS: ({ page, pageSize, search }: RequestParams) => {
    if (search === undefined || search === "") {
      return `/staffs?page=${page}&pageSize=${pageSize}`;
    }
    return `/staffs?search=${search}&page=${page}&pageSize=${pageSize}`;
  },
  GET_STAFF: (id: number) => `/staff/${id}`,
};

export default UsersEndpoints;
