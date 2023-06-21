import { GenderType, RoleType } from "features/admin_auth/admin_auth";

export type BasicUserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: GenderType | null;
  dateOfBirth: string | null;
};

export type PrivateUserInfo = {
  loginName: string;
  email: string | null;
  location: string | null;
  created: string;
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

export interface UsersState {
  avatar: UserAvatar | null;
}
