import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ChangePasswordRequestBody,
  GetMyAvatarResponse,
  SettingState,
  changePasswordApi,
  getMyAvatarApi,
} from "../admin_setting";
import SETTING_KEY from "../constants/setting.keys";

const initialState: SettingState = {
  avatar: null,
};

export const getMyAvatar = createAsyncThunk(
  `${SETTING_KEY}/getMyAvatar`,
  async () => {
    const response = await getMyAvatarApi();
    return response.data.data;
  }
);

export const changePassword = createAsyncThunk(
  `${SETTING_KEY}/changePassword`,
  async (data: ChangePasswordRequestBody) => {
    const response = await changePasswordApi(data);
    return response.data.data;
  }
);

const settingSlice = createSlice({
  name: SETTING_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getMyAvatar.fulfilled,
      (state, action: PayloadAction<GetMyAvatarResponse>) => {
        state.avatar = action.payload;
      }
    );
    builder.addCase(getMyAvatar.rejected, (state) => {
      state.avatar = null;
    });
  },
});

export const settingReducer = settingSlice.reducer;
