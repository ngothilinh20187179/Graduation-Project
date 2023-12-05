import { UserProfile } from "features/staff_users/staff_users";

export type ChangePasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export interface SettingState {
  myProfile: UserProfile | null;
}
