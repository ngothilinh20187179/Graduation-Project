import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import { CreateQuiz, EnterTranscript, Mark, TeachingState, createQuizApi, deleteQuizApi, enterTranscriptApi, getAllOfflineTestScoresApi, getAllOnlineTestScoresApi, getClassApi, getClassesApi, getMyTeachingScheduleApi, getQuizApi, getQuizzesApi, updateMarkApi } from "../teaching.types";
import TEACHING_KEY from "../constants/teaching.keys";

const initialState: TeachingState = {
  classes: null,
  classDetail: null,
  offlineTestScores: null,
  onlineTestScores: null,
  myTeachingSchedule: null,
  quizzes: null,
  quiz: null
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

export const updateMark = createAsyncThunk(
  `${TEACHING_KEY}/updateMark`,
  async (data: Mark) => {
    const { id, point } = data;
    return updateMarkApi(id, point);
  }
);

export const getQuizzes = createAsyncThunk(
  `${TEACHING_KEY}/getQuizzes`,
  async (params: RequestParams) => {
    const response = await getQuizzesApi(params);
    return response.data.data;
  }
);

export const getMyTeachingSchedule = createAsyncThunk(
  `${TEACHING_KEY}/getMyTeachingSchedule`,
  async () => {
    const response = await getMyTeachingScheduleApi();
    return response;
  }
);

export const getQuiz = createAsyncThunk(
  `${TEACHING_KEY}/getQuiz`,
  async (id: number) => {
    const response = await getQuizApi(id);
    return response.data;
  }
);

export const deleteQuiz = createAsyncThunk(
  `${TEACHING_KEY}/deleteQuiz`,
  async (id: number) => {
    return deleteQuizApi(id);
  }
);

export const enterTranscript = createAsyncThunk(
  `${TEACHING_KEY}/enterTranscript`,
  async (data: EnterTranscript) => {
    return enterTranscriptApi(data);
  }
);

export const createQuiz = createAsyncThunk(
  `${TEACHING_KEY}/createQuiz`,
  async (data: CreateQuiz) => {
    return createQuizApi(data);
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
    builder.addCase(getMyTeachingSchedule.fulfilled, (state, action) => {
      state.myTeachingSchedule = action.payload;
    });
    builder.addCase(getMyTeachingSchedule.rejected, (state) => {
      state.myTeachingSchedule = null;
    });
    builder.addCase(getQuizzes.fulfilled, (state, action) => {
      state.quizzes = action.payload;
    });
    builder.addCase(getQuizzes.rejected, (state) => {
      state.quizzes = null;
    });
    builder.addCase(getQuiz.fulfilled, (state, action) => {
      state.quiz = action.payload;
    });
    builder.addCase(getQuiz.rejected, (state) => {
      state.quiz = null;
    });
  },
});

export const teachingReducer = teachingSlice.reducer;
