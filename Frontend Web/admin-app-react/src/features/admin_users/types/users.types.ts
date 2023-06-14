export type GetUserResponse = {
  id: number;
  loginName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: number;
  email: string;
  location: string;
  dateOfBirth: string;
  created: string;
  role: number;
  avatar: GetUserAvatarResponse;
};

export type GetUserAvatarResponse = {
  mediaType: string;
  data: string;
};

export interface UsersState {
  user: GetUserResponse | null;
}
