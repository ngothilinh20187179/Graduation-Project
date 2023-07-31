import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CLASSES_KEY from "../constants/classes.keys";
import { ClassesState, Subject, createSubjectApi, deleteSubjectApi, getSubjectApi, getSubjectsApi, updateSubjectApi } from "../admin_classes";
import { RequestParams } from "types/param.types";

const initialState: ClassesState = {
  subjects: null,
  subject: null,
};

export const getSubjects = createAsyncThunk(
  `${CLASSES_KEY}/getSubjects`,
  async (params: RequestParams) => {
    const response = await getSubjectsApi(params);
    return response.data;
  }
);

export const getSubject = createAsyncThunk(
  `${CLASSES_KEY}/getSubject`,
  async (id: number) => {
    const response = await getSubjectApi(id);
    return response.data;
  }
);

export const createSubject = createAsyncThunk(
  `${CLASSES_KEY}/createSubject`,
  async (data: Subject) => {
    return createSubjectApi(data);
  }
);

export const updateSubject = createAsyncThunk(
  `${CLASSES_KEY}/updateSubject`,
  async (subject: Subject) => {
    const { id, ...fields } = subject
    return updateSubjectApi(Number(id), fields );
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
    builder.addCase(getSubject.fulfilled, (state, action) => {
      state.subject = action.payload;
    });
    builder.addCase(getSubject.rejected, (state) => {
      state.subject = null;
    });
  },
});

export const classesReducer = classesSlice.reducer;
