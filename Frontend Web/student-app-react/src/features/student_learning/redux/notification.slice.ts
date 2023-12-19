import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import LEARNING_KEY from "../constants/learning.keys";
import { LearningState, getAllOfflineTestScoresApi, getAllOnlineTestScoresApi, getMyTestsApi } from "../student_learning";

const initialState: LearningState = {
  offlineTestScores: null,
  onlineTestScores: null,
  myTests: null,
};

export const getAllOnlineTestScores = createAsyncThunk(
  `${LEARNING_KEY}/getAllOnlineTestScores`,
  async (params: RequestParams) => {
    const response = await getAllOnlineTestScoresApi(params);
    return response.data.data;
  }
);

export const getAllOfflineTestScores = createAsyncThunk(
  `${LEARNING_KEY}/getAllOfflineTestScores`,
  async (params: RequestParams) => {
    const response = await getAllOfflineTestScoresApi(params);
    return response.data.data;
  }
);

export const getMyTests = createAsyncThunk(
  `${LEARNING_KEY}/getMyTests`,
  async (params: RequestParams) => {
    const response = await getMyTestsApi(params);
    return response.data.data;
  }
);

const learningSlice = createSlice({
  name: LEARNING_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
    builder.addCase(getMyTests.fulfilled, (state, action) => {
      state.myTests = action.payload;
    });
    builder.addCase(getMyTests.rejected, (state) => {
      state.myTests = null;
    });
  },
});

export const learningReducer = learningSlice.reducer;
