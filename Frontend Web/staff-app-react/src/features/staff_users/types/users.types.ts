import { PaginationResponse } from "types/pagination.types";
import { GenderType, UserStatusType } from "../staff_users";
import { RoleType } from "features/staff_auth/staff_auth";

export type BasicUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: GenderType | null;
  dateOfBirth: string | null;
  userStatus: UserStatusType;
};

export type PrivateUserInfo = {
  loginName: string;
  email: string | null;
  location: string | null;
  createdOn: string;
  role: RoleType;
};

export type UserAvatar = {
  mediaType: string;
  data: string;
};

export type UserProfile = BasicUserInfo &
  PrivateUserInfo & {
    avatar: UserAvatar | null;
};

export type EditInformationRequestBody = {
  loginName: string;
  email: string | null;
  location: string | null;
} & BasicUserInfo;

export type AdminInformation = {
  id?: number;
  loginName: string;
  password: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | null;
  gender: GenderType | null;
  location: string | null;
  dateOfBirth: string | null;
}

export type StaffInfo = {
  graduateAt: string;
  graduationTime: string;
  hireDate: string;
  yearsOfWorking: number;
  note: string | null;
  positionId: number;
}

export type StaffDetail = BasicUserInfo &
  PrivateUserInfo & StaffInfo & {
    avatar: UserAvatar | null;
    positionName: string;
};

export type TeacherInfo = {
  graduateAt: string;
  graduationTime: string;
  note: string | null;
  hourlySalary: number;
}

export type TeacherDetail = BasicUserInfo &
  PrivateUserInfo & TeacherInfo & {
    avatar: UserAvatar | null;
};

export type CreateEditTeacherInfo = AdminInformation & TeacherInfo;

export type StudentInfo = {
  parentsName: string | null;
  parentPhoneNumber: string | null;
  note: string | null;
}

export type StudentDetail = BasicUserInfo &
  PrivateUserInfo & StudentInfo & {
    avatar: UserAvatar | null;
};

export type CreateEditStudentInfo = AdminInformation & StudentInfo;

export interface GetAllAdminsResponse extends PaginationResponse {
  data: (BasicUserInfo & {
    avatar: UserAvatar | null;
  }) [];
}

export interface GetAllStaffsResponse extends PaginationResponse {
  data: (BasicUserInfo & {
    avatar: UserAvatar | null;
    positionName: string;
  }) [];
}

export type UserIdAndName = {
  id: number;
  firstName: string;
  lastName: string;
}

export interface GetTeacherListResponse {
  data: UserIdAndName [];
}

export interface GetStaffListResponse {
  data: UserIdAndName [];
}

export interface UsersState {
  avatar: UserAvatar | null;
  staffs: GetAllStaffsResponse | null;
  staff: StaffDetail | null;
  teachers: GetAllAdminsResponse | null;
  teacher: TeacherDetail | null;
  students: GetAllAdminsResponse | null;
  student: StudentDetail | null;
  teacherList: GetTeacherListResponse | null;
  staffList: GetStaffListResponse | null;
}
