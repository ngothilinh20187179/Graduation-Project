export type GetMyAvatarResponse = {
  mediaType: string;
  data: string;
};

export interface SettingState {
  avatar: GetMyAvatarResponse | null;
}
