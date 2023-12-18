import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import LEARNING_KEY from "../constants/learning.keys";
import { LearningState, getAllOfflineTestScoresApi, getAllOnlineTestScoresApi } from "../student_learning";

const initialState: LearningState = {
  offlineTestScores: null,
  onlineTestScores: null,
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
  },
});

export const learningReducer = learningSlice.reducer;
