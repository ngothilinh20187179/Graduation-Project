import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import USERS_KEY from "../constants/users.keys";
import { GetUserResponse, UsersState, getUserByIdApi } from "../staff_users";

const initialState: UsersState = {
  user: null,
};

export const getUserById = createAsyncThunk(
  `${USERS_KEY}/getUserById`,
  async (userId: number, thunkAPI) => {
    const response = await getUserByIdApi(userId);
    return response.data.data;
  }
);

const usersSlice = createSlice({
  name: USERS_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserById.fulfilled,
      (state, action: PayloadAction<GetUserResponse>) => {
        state.user = action.payload;
      }
    );
    builder.addCase(getUserById.rejected, (state) => {
      state.user = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
