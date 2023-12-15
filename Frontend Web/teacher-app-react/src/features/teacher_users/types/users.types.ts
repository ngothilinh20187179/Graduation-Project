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

export interface UsersState {
  avatar: UserAvatar | null;
}
