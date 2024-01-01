const UsersEndpoints = {
  GET_MY_AVATAR: () => `/myavatar`,
  GET_STUDENTS_IN_CLASS: (id: number) => `/class/${id}/students`,
  GET_STUDENT: (id: number) => `/student/${id}`,
};

export default UsersEndpoints;
