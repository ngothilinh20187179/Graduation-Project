import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import USERS_KEY from "../constants/users.keys";
import {
  AdminInformation,
  RestricteAccount,
  UserAvatar,
  UsersState,
  createAdminInfoApi,
  getAdminByIdApi,
  getAdminsApi,
  getMyAvatarApi,
  getStaffByIdApi,
  getStaffsApi,
  restricteAccountApi,
  updateAdminInfoApi,
} from "../admin_users";
import { RequestParams } from "types/param.types";

const initialState: UsersState = {
  avatar: null,
  admins: null,
  admin: null,
  staffs: null,
  staff: null
};

export const getAdmins = createAsyncThunk(
  `${USERS_KEY}/getAdmins`,
  async (params: RequestParams) => {
    const response = await getAdminsApi(params);
    return response.data.data;
  }
);

export const getAdminById = createAsyncThunk(
  `${USERS_KEY}/getAdminById`,
  async (id: number) => {
    const response = await getAdminByIdApi(id);
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
export const restricteAccount = createAsyncThunk(
  `${USERS_KEY}/restricteAccount`,
  async (data : RestricteAccount) => {
    const { id, userStatusType } = data;
    return restricteAccountApi(Number(id), userStatusType );
  }
);

export const updateAdminInfo = createAsyncThunk(
  `${USERS_KEY}/updateAdminInfo`,
  async (adminInfo: AdminInformation) => {
    const { id, ...fields } = adminInfo
    return updateAdminInfoApi(Number(id), fields );
  }
);

export const createAdminInfo = createAsyncThunk(
  `${USERS_KEY}/createAdminInfo`,
  async (data: AdminInformation) => {
    return createAdminInfoApi(data);
  }
);

export const getStaffs = createAsyncThunk(
  `${USERS_KEY}/getStaffs`,
  async (params: RequestParams) => {
    const response = await getStaffsApi(params);
    return response.data.data;
  }
);

export const getStaffById = createAsyncThunk(
  `${USERS_KEY}/getStaffById`,
  async (id: number) => {
    const response = await getStaffByIdApi(id);
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
    builder.addCase(getAdmins.fulfilled, (state, action) => {
      state.admins = action.payload;
    });
    builder.addCase(getAdmins.rejected, (state) => {
      state.admins = null;
    });
    builder.addCase(getAdminById.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
    builder.addCase(getAdminById.rejected, (state) => {
      state.admin = null;
    });
    builder.addCase(getStaffs.fulfilled, (state, action) => {
      state.staffs = action.payload;
    });
    builder.addCase(getStaffs.rejected, (state) => {
      state.staffs = null;
    });
    builder.addCase(getStaffById.fulfilled, (state, action) => {
      state.staff = action.payload;
    });
    builder.addCase(getStaffById.rejected, (state) => {
      state.staff = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
