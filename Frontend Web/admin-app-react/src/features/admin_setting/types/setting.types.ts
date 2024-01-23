import { UserProfile } from "features/admin_users/admin_users";

export type ChangePasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export type GenderStatistical = {
  totalNumberOfStudents: number;
  numberOfGirls: number;
  numberOfBoys: number;
  girlPercents: number;
  boyPercents: number;
};

export interface SettingState {
  myProfile: UserProfile | null;
  genderStudentStatistical: GenderStatistical | null;
}
