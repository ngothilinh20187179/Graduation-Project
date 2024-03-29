import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import LEARNING_KEY from "../constants/learning.keys";
import { LearningState, QuizSubmit, getAllOfflineTestScoresApi, getAllOnlineTestScoresApi, getClassApi, getClassesApi, getMyLearningScheduleApi, getMyTestsApi, getQuizApi, submitExamApi } from "../student_learning";

const initialState: LearningState = {
  offlineTestScores: null,
  onlineTestScores: null,
  myTests: null,
  classes: null,
  classDetail: null,
  quiz: null,
  myLearningSchedule: null,
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

export const getClasses = createAsyncThunk(
  `${LEARNING_KEY}/getClasses`,
  async (params: RequestParams) => {
    const response = await getClassesApi(params);
    return response.data.data;
  }
);

export const getClass = createAsyncThunk(
  `${LEARNING_KEY}/getClass`,
  async (id: number) => {
    const response = await getClassApi(id);
    return response.data;
  }
);

export const getQuiz = createAsyncThunk(
  `${LEARNING_KEY}/getQuiz`,
  async (id: number) => {
    const response = await getQuizApi(id);
    return response.data;
  }
);

export const submitExam = createAsyncThunk(
  `${LEARNING_KEY}/submitExam`,
  async (data: QuizSubmit) => {
    const response = await submitExamApi(data);
    return response.data.data;
  }
);

export const getMyLearningSchedule = createAsyncThunk(
  `${LEARNING_KEY}/getMyLearningSchedule`,
  async () => {
    const response = await getMyLearningScheduleApi();
    return response;
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
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload;
    });
    builder.addCase(getQuiz.rejected, (state) => {
      state.quiz = null;
    });
    builder.addCase(getMyLearningSchedule.fulfilled, (state, action) => {
      state.myLearningSchedule = action.payload;
    });
    builder.addCase(getMyLearningSchedule.rejected, (state) => {
      state.myLearningSchedule = null;
    });
  },
});

export const learningReducer = learningSlice.reducer;
