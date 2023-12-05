import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ChangePasswordRequestBody,
  SettingState,
  changeAvatarApi,
  changeInformationApi,
  changePasswordApi,
  deleteAvatarApi,
  getMyProfileApi,
} from "../staff_setting";
import SETTING_KEY from "../constants/setting.keys";
import {
  EditInformationRequestBody,
  UserProfile,
} from "features/staff_users/staff_users";

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

export const changeInformation = createAsyncThunk(
  `${SETTING_KEY}/edit-myprofile`,
  async (data: EditInformationRequestBody) => {
    return changeInformationApi(data);
  }
);

export const changeAvatar = createAsyncThunk(
  `${SETTING_KEY}/changeAvatar`,
  async (data: FormData) => {
    return changeAvatarApi(data);
  }
);

export const deleteAvatar = createAsyncThunk(
  `${SETTING_KEY}/deleteAvatar`,
  async () => {
    return deleteAvatarApi();
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
