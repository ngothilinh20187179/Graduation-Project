import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CLASSES_KEY from "../constants/classes.keys";
import { ClassesState, Subject, createSubjectApi, deleteSubjectApi, getSubjectsApi } from "../admin_classes";
import { RequestParams } from "types/param.types";

const initialState: ClassesState = {
  subjects: null,
};

export const getSubjects = createAsyncThunk(
  `${CLASSES_KEY}/getSubjects`,
  async (params: RequestParams) => {
    const response = await getSubjectsApi(params);
    return response.data;
  }
);

export const createSubject = createAsyncThunk(
  `${CLASSES_KEY}/createSubject`,
  async (data: Subject) => {
    return createSubjectApi(data);
  }
);

export const deleteSubject = createAsyncThunk(
  `${CLASSES_KEY}/deleteSubject`,
  async (id: number) => {
    return deleteSubjectApi(id);
  }
);

const classesSlice = createSlice({
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

export const classesReducer = classesSlice.reducer;
