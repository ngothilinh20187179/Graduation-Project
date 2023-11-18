import { GenderType, RoleType, UserStatusType } from "features/admin_auth/admin_auth";
import { PaginationResponse } from "types/pagination.types";

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

export interface GetAllAdminsResponse extends PaginationResponse {
  data: (BasicUserInfo & {
    avatar: UserAvatar | null;
  }) [];
}

export type RestricteAccount = {
  id: number;
  userStatusType: UserStatusType;
}

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

export interface UsersState {
  avatar: UserAvatar | null;
  admins: GetAllAdminsResponse | null;
  admin: UserProfile | null;
}
