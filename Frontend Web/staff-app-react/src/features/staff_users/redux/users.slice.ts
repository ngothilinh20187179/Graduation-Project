import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import USERS_KEY from "../constants/users.keys";
import {
  CreateEditStudentInfo,
  CreateEditTeacherInfo,
  UserAvatar,
  UsersState,
  createStudentInfoApi,
  createTeacherInfoApi,
  getMyAvatarApi,
  getStaffByIdApi,
  getStaffsApi,
  getStaffsListApi,
  getStudentByIdApi,
  getStudentsApi,
  getStudentsAvailableApi,
  getStudentsInClassApi,
  getTeacherByIdApi,
  getTeachersApi,
  getTeachersListApi,
  updateStudentInfoApi,
  updateTeacherInfoApi,
} from "../staff_users";
import { RequestParams } from "types/param.types";

const initialState: UsersState = {
  avatar: null,
  staffs: null,
  staff: null,
  teachers: null,
  teacher: null,
  students: null,
  student: null,
  teacherList: null,
  staffList: null,
};

export const getMyAvatar = createAsyncThunk(
  `${USERS_KEY}/getMyAvatar`,
  async () => {
    const response = await getMyAvatarApi();
    return response.data.data;
  }
);

export const getStaffs = createAsyncThunk(
  `${USERS_KEY}/getStaffs`,
  async (params: RequestParams) => {
    const response = await getStaffsApi(params);
    return response.data.data;
  }
);

export const getStaffsList = createAsyncThunk(
  `${USERS_KEY}/getStaffsList`,
  async () => {
    const response = await getStaffsListApi();
    return response.data;
  }
);

export const getStaffById = createAsyncThunk(
  `${USERS_KEY}/getStaffById`,
  async (id: number) => {
    const response = await getStaffByIdApi(id);
    return response.data.data;
  }
);

export const getTeachers = createAsyncThunk(
  `${USERS_KEY}/getTeachers`,
  async (params: RequestParams) => {
    const response = await getTeachersApi(params);
    return response.data.data;
  }
);

export const getTeachersList = createAsyncThunk(
  `${USERS_KEY}/getTeachersList`,
  async () => {
    const response = await getTeachersListApi();
    return response.data;
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

export const getStudentById = createAsyncThunk(
  `${USERS_KEY}/getStudentById`,
  async (id: number) => {
    const response = await getStudentByIdApi(id);
    return response.data.data;
  }
);

export const getStudentsInClass = createAsyncThunk(
  `${USERS_KEY}/getStudentsInClass`,
  async (id: number) => {
    const response = await getStudentsInClassApi(id);
    return response.data.data;
  }
);

export const updateStudentInfo = createAsyncThunk(
  `${USERS_KEY}/updateStudentInfo`,
  async (staffInfo: CreateEditStudentInfo) => {
    const { id, ...fields } = staffInfo
    return updateStudentInfoApi(Number(id), fields );
  }
);

export const createStudentInfo = createAsyncThunk(
  `${USERS_KEY}/createStudentInfo`,
  async (data: CreateEditStudentInfo) => {
    return createStudentInfoApi(data);
  }
);

export const getStudentsAvailable = createAsyncThunk(
  `${USERS_KEY}/getStudentsAvailable`,
  async (id: Number) => {
    const response = await getStudentsAvailableApi(Number(id));
    return response.data;
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
    builder.addCase(getStaffs.fulfilled, (state, action) => {
      state.staffs = action.payload;
    });
    builder.addCase(getStaffs.rejected, (state) => {
      state.staffs = null;
    });
    builder.addCase(getStaffById.fulfilled, (state, action) => {
      state.staff = action.payload;
    });
    builder.addCase(getStaffsList.fulfilled, (state, action) => {
      state.staffList = action.payload;
    });
    builder.addCase(getStaffsList.rejected, (state) => {
      state.staffList = null;
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
    builder.addCase(getTeachersList.fulfilled, (state, action) => {
      state.teacherList = action.payload;
    });
    builder.addCase(getTeachersList.rejected, (state) => {
      state.teacherList = null;
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
    builder.addCase(getStudentById.fulfilled, (state, action) => {
      state.student = action.payload;
    });
    builder.addCase(getStudentById.rejected, (state) => {
      state.student = null;
    });
    
    builder.addCase(getStudentsInClass.fulfilled, (state, action) => {
      state.students = action.payload;
    });
    builder.addCase(getStudentsInClass.rejected, (state) => {
      state.students = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
