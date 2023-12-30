export enum GenderType {
  Male,
  Female,
}

export enum UserStatusType {
  Lock, 
  UnLock,
}

export const COLUMNS_TABLE_STUDENTS = () => [
  {
    title: "",
    dataIndex: "index",
    key: "index",
    width: "50px",
  },
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    width: "50px",
  },  
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    ellipsis: true,
    width: "70px",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
    ellipsis: true,
    width: "100px",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
    ellipsis: true,
    width: "100px",
  }, 
  {
    title: "Status",
    dataIndex: "userStatus",
    key: "userStatus",
    ellipsis: true,
    width: "80px",
  }, 
  {
    title: "Date Of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
    ellipsis: true,
    width: "100px",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    ellipsis: true,
    width: "70px",
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    ellipsis: true,
    width: "100px",
  },
]