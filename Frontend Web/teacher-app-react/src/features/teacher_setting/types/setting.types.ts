import { UserProfile } from "features/teacher_users/teacher_users";

export type ChangePasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export interface SettingState {
  myProfile: UserProfile | null;
}
