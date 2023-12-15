import { UserProfile } from "features/student_users/student_users";

export type ChangePasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export interface SettingState {
  myProfile: UserProfile | null;
}
