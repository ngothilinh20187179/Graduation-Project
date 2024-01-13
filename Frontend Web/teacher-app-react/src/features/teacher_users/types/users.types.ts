import { PaginationResponse } from "types/pagination.types";
import { GenderType, UserStatusType } from "../teacher_users";
import { RoleType } from "features/teacher_auth/teacher_auth";

export type BasicUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: GenderType | null;
  dateOfBirth: string | null;
  userStatus: UserStatusType;
};

export type StudentInfo = {
  parentsName: string | null;
  parentPhoneNumber: string | null;
  note: string | null;
}

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


export interface GetStudentsInClassResponse extends PaginationResponse {
  data: (BasicUserInfo & {
    avatar: UserAvatar | null;
  }) [];
}

export type StudentNameAndId = {
  id: number;
  firstName: string;
  lastName: string;
}

export type GetAllStudentsInClassResponse = {
  data: StudentNameAndId[];
}

export type StudentDetail = BasicUserInfo &
  PrivateUserInfo & StudentInfo & {
    avatar: UserAvatar | null;
};

export interface UsersState {
  avatar: UserAvatar | null;
  students: GetStudentsInClassResponse | null;
  student: StudentDetail | null;
  allStudents: GetAllStudentsInClassResponse | null;
}
