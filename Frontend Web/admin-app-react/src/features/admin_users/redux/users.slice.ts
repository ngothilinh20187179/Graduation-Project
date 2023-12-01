import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import USERS_KEY from "../constants/users.keys";
import {
  AdminInformation,
  CreateEditStaffInfo,
  CreateEditTeacherInfo,
  RestricteAccount,
  UserAvatar,
  UsersState,
  createAdminInfoApi,
  createStaffInfoApi,
  createTeacherInfoApi,
  getAdminByIdApi,
  getAdminsApi,
  getMyAvatarApi,
  getPositionListApi,
  getStaffByIdApi,
  getStaffsApi,
  getStudentsApi,
  getTeacherByIdApi,
  getTeachersApi,
  restricteAccountApi,
  updateAdminInfoApi,
  updateStaffInfoApi,
  updateTeacherInfoApi,
} from "../admin_users";
import { RequestParams } from "types/param.types";

const initialState: UsersState = {
  avatar: null,
  admins: null,
  admin: null,
  staffs: null,
  staff: null,
  teachers: null,
  teacher: null,
  students: null,
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

export const createStaffInfo = createAsyncThunk(
  `${USERS_KEY}/createStaffInfo`,
  async (data: CreateEditStaffInfo) => {
    return createStaffInfoApi(data);
  }
);

export const getPositionList = createAsyncThunk(
  `${USERS_KEY}/getPositionList`,
  async () => {
    const response = await getPositionListApi();
    return response.data;
  }
);

export const updateStaffInfo = createAsyncThunk(
  `${USERS_KEY}/updateStaffInfo`,
  async (staffInfo: CreateEditStaffInfo) => {
    const { id, ...fields } = staffInfo
    return updateStaffInfoApi(Number(id), fields );
  }
);

export const getTeachers = createAsyncThunk(
  `${USERS_KEY}/getTeachers`,
  async (params: RequestParams) => {
    const response = await getTeachersApi(params);
    return response.data.data;
  }
);

export const getTeacherById = createAsyncThunk(
  `${USERS_KEY}/getTeacherById`,
  async (id: number) => {
    const response = await getTeacherByIdApi(id);
    return response.data.data;
  }
);

export const createTeacherInfo = createAsyncThunk(
  `${USERS_KEY}/createTeacherInfo`,
  async (data: CreateEditTeacherInfo) => {
    return createTeacherInfoApi(data);
  }
);

export const updateTeacherInfo = createAsyncThunk(
  `${USERS_KEY}/updateTeacherInfo`,
  async (staffInfo: CreateEditTeacherInfo) => {
    const { id, ...fields } = staffInfo
    return updateTeacherInfoApi(Number(id), fields );
  }
);

export const getStudents = createAsyncThunk(
  `${USERS_KEY}/getStudents`,
  async (params: RequestParams) => {
    const response = await getStudentsApi(params);
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
    builder.addCase(getTeachers.fulfilled, (state, action) => {
      state.teachers = action.payload;
    });
    builder.addCase(getTeachers.rejected, (state) => {
      state.teachers = null;
    });
    builder.addCase(getTeacherById.fulfilled, (state, action) => {
      state.teacher = action.payload;
    });
    builder.addCase(getTeacherById.rejected, (state) => {
      state.teacher = null;
    });
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.students = action.payload;
    });
    builder.addCase(getStudents.rejected, (state) => {
      state.students = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
