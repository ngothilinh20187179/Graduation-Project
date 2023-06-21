import { UserProfile } from "features/admin_users/admin_users";

export type ChangePasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export interface SettingState {
  myProfile: UserProfile | null;
}
