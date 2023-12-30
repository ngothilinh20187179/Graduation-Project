import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import { TeachingState, getClassApi, getClassesApi } from "../teaching.types";
import TEACHING_KEY from "../constants/teaching.keys";

const initialState: TeachingState = {
  classes: null,
  classDetail: null
};

export const getClasses = createAsyncThunk(
  `${TEACHING_KEY}/getClasses`,
  async (params: RequestParams) => {
    const response = await getClassesApi(params);
    return response.data.data;
  }
);

export const getClass = createAsyncThunk(
  `${TEACHING_KEY}/getClass`,
  async (id: number) => {
    const response = await getClassApi(id);
    return response.data;
  }
);

const teachingSlice = createSlice({
  name: TEACHING_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.classes = action.payload;
    });
    builder.addCase(getClasses.rejected, (state) => {
      state.classes = null;
    });
    builder.addCase(getClass.fulfilled, (state, action) => {
      state.classDetail = action.payload;
    });
    builder.addCase(getClass.rejected, (state) => {
      state.classDetail = null;
    });
  },
});

export const teachingReducer = teachingSlice.reducer;
