import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import USERS_KEY from "../constants/users.keys";
import {
  UserAvatar,
  UsersState,
  getMyAvatarApi,
  getUserByIdApi,
} from "../admin_users";

const initialState: UsersState = {
  avatar: null,
};

export const getUserById = createAsyncThunk(
  `${USERS_KEY}/getUserById`,
  async (userId: number) => {
    const response = await getUserByIdApi(userId);
    return response.data.data;
  }
);

export const getMyAvatar = createAsyncThunk(
  `${USERS_KEY}/getMyAvatar`,
  async () => {
    const response = await getMyAvatarApi();
    return response.data.data;
  }
);

const usersSlice = createSlice({
  name: USERS_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMyAvatar.fulfilled,
      (state, action: PayloadAction<UserAvatar>) => {
        state.avatar = action.payload;
      }
    );
    builder.addCase(getMyAvatar.rejected, (state) => {
      state.avatar = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
