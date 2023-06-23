import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CLASSES_KEY from "../constants/classes.keys";
import { ClassesState, getSubjectsApi } from "../admin_classes";

const initialState: ClassesState = {
  subjects: null,
};

export const getSubjects = createAsyncThunk(
  `${CLASSES_KEY}/getSubjects`,
  async () => {
    const response = await getSubjectsApi();
    return response.data;
  }
);

const usersSlice = createSlice({
  name: CLASSES_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload;
    });
    builder.addCase(getSubjects.rejected, (state) => {
      state.subjects = null;
    });
  },
});

export const usersReducer = usersSlice.reducer;
