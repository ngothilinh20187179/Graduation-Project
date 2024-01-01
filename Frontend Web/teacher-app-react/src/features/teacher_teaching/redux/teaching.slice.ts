import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import { TeachingState, getAllOfflineTestScoresApi, getAllOnlineTestScoresApi, getClassApi, getClassesApi } from "../teaching.types";
import TEACHING_KEY from "../constants/teaching.keys";

const initialState: TeachingState = {
  classes: null,
  classDetail: null,
  offlineTestScores: null,
  onlineTestScores: null,
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

export const getAllOnlineTestScores = createAsyncThunk(
  `${TEACHING_KEY}/getAllOnlineTestScores`,
  async (params: RequestParams) => {
    const response = await getAllOnlineTestScoresApi(params);
    return response.data.data;
  }
);

export const getAllOfflineTestScores = createAsyncThunk(
  `${TEACHING_KEY}/getAllOfflineTestScores`,
  async (params: RequestParams) => {
    const response = await getAllOfflineTestScoresApi(params);
    return response.data.data;
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
    builder.addCase(getAllOfflineTestScores.fulfilled, (state, action) => {
      state.offlineTestScores = action.payload;
    });
    builder.addCase(getAllOfflineTestScores.rejected, (state) => {
      state.offlineTestScores = null;
    });
    builder.addCase(getAllOnlineTestScores.fulfilled, (state, action) => {
      state.onlineTestScores = action.payload;
    });
    builder.addCase(getAllOnlineTestScores.rejected, (state) => {
      state.onlineTestScores = null;
    });
  },
});

export const teachingReducer = teachingSlice.reducer;
