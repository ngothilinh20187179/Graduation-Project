import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import USERS_KEY from "../constants/users.keys";
import {
  UserAvatar,
  UsersState,
  getMyAvatarApi,
  getStudentByIdApi,
  getStudentsInClassApi,
} from "../teacher_users";

const initialState: UsersState = {
  avatar: null,
  students: null,
  student: null,
};

export const getMyAvatar = createAsyncThunk(
  `${USERS_KEY}/getMyAvatar`,
  async () => {
    const response = await getMyAvatarApi();
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

export const getStudentById = createAsyncThunk(
  `${USERS_KEY}/getStudentById`,
  async (id: number) => {
    const response = await getStudentByIdApi(id);
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
    builder.addCase(getStudentsInClass.fulfilled, (state, action) => {
      state.students = action.payload;
    });
    builder.addCase(getStudentsInClass.rejected, (state) => {
      state.students = null;
    });
    builder.addCase(getStudentById.fulfilled, (state, action) => {
      state.student = action.payload;
    });
    builder.addCase(getStudentById.rejected, (state) => {
      state.student = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
