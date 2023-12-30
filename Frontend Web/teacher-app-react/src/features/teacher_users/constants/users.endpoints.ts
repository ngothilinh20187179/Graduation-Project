const UsersEndpoints = {
  GET_MY_AVATAR: () => `/myavatar`,
  GET_STUDENTS_IN_CLASS: (id: number) => `/class/${id}/students`,
};

export default UsersEndpoints;
