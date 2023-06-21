import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ChangePasswordRequestBody,
  SettingState,
  changePasswordApi,
  getMyProfileApi,
} from "../admin_setting";
import SETTING_KEY from "../constants/setting.keys";
import { UserProfile } from "features/admin_users/admin_users";

const initialState: SettingState = {
  myProfile: null,
};

export const changePassword = createAsyncThunk(
  `${SETTING_KEY}/changePassword`,
  async (data: ChangePasswordRequestBody) => {
    return changePasswordApi(data);
  }
);

export const getMyProfile = createAsyncThunk(
  `${SETTING_KEY}/myprofile`,
  async () => {
    const response = await getMyProfileApi();
    return response.data.data;
  }
);

const settingSlice = createSlice({
  name: SETTING_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMyProfile.fulfilled,
      (state, action: PayloadAction<UserProfile>) => {
        state.myProfile = action.payload;
      }
    );
    builder.addCase(getMyProfile.rejected, (state) => {
      state.myProfile = null;
    });
  },
});

export const settingReducer = settingSlice.reducer;
