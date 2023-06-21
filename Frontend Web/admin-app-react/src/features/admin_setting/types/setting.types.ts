export type GetMyAvatarResponse = {
  mediaType: string;
  data: string;
};

export type ChangePasswordRequestBody = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

export interface SettingState {
  avatar: GetMyAvatarResponse | null;
}
