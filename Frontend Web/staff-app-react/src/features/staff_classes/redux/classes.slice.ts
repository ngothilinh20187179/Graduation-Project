import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CLASSES_KEY from "../constants/classes.keys";
import {
  ClassesState,
  CreateEditClassInfo,
  Room,
  Subject,
  createClassInfoApi,
  createRoomApi,
  createSubjectApi,
  deleteClassRoomApi,
  deleteRoomApi,
  deleteSubjectApi,
  getClassApi,
  getClassesApi,
  getOpenRoomsApi,
  getOpenSubjectsApi,
  getRoomApi,
  getRoomsApi,
  getSubjectApi,
  getSubjectsApi,
  updateRoomApi,
  updateSubjectApi,
} from "../staff_classes";
import { RequestParams } from "types/param.types";

const initialState: ClassesState = {
  classes: null,
  subjects: null,
  subject: null,
  rooms: null,
  room: null,
  classDetail: null,
};

export const getSubjects = createAsyncThunk(
  `${CLASSES_KEY}/getSubjects`,
  async (params: RequestParams) => {
    const response = await getSubjectsApi(params);
    return response.data.data;
  }
);

export const getOpenSubjects = createAsyncThunk(
  `${CLASSES_KEY}/getOpenSubjects`,
  async () => {
    const response = await getOpenSubjectsApi();
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
    const { id, ...fields } = subject;
    return updateSubjectApi(Number(id), fields);
  }
);

export const deleteSubject = createAsyncThunk(
  `${CLASSES_KEY}/deleteSubject`,
  async (id: number) => {
    return deleteSubjectApi(id);
  }
);

export const getRooms = createAsyncThunk(
  `${CLASSES_KEY}/getRooms`,
  async (params: RequestParams) => {
    const response = await getRoomsApi(params);
    return response.data.data;
  }
);

export const getRoom = createAsyncThunk(
  `${CLASSES_KEY}/getRoom`,
  async (id: number) => {
    const response = await getRoomApi(id);
    return response.data;
  }
);

export const getOpenRooms = createAsyncThunk(
  `${CLASSES_KEY}/getOpenRooms`,
  async () => {
    const response = await getOpenRoomsApi();
    return response.data;
  }
);

export const createRoom = createAsyncThunk(
  `${CLASSES_KEY}/createRoom`,
  async (data: Room) => {
    return createRoomApi(data);
  }
);

export const updateRoom = createAsyncThunk(
  `${CLASSES_KEY}/updateRoom`,
  async (room: Room) => {
    const { id, ...fields } = room;
    return updateRoomApi(Number(id), fields);
  }
);

export const deleteRoom = createAsyncThunk(
  `${CLASSES_KEY}/deleteRoom`,
  async (id: number) => {
    return deleteRoomApi(id);
  }
);

export const getClasses = createAsyncThunk(
  `${CLASSES_KEY}/getClasses`,
  async (params: RequestParams) => {
    const response = await getClassesApi(params);
    return response.data.data;
  }
);

export const getClass = createAsyncThunk(
  `${CLASSES_KEY}/getClass`,
  async (id: number) => {
    const response = await getClassApi(id);
    return response.data;
  }
);

export const createClassInfo = createAsyncThunk(
  `${CLASSES_KEY}/createClassInfo`,
  async (data: CreateEditClassInfo) => {
    return createClassInfoApi(data);
  }
);

export const deleteClassRoom = createAsyncThunk(
  `${CLASSES_KEY}/deleteClassRoom`,
  async (id: number) => {
    return deleteClassRoomApi(id);
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
    builder.addCase(getRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
    builder.addCase(getRooms.rejected, (state) => {
      state.rooms = null;
    });
    builder.addCase(getRoom.fulfilled, (state, action) => {
      state.room = action.payload;
    });
    builder.addCase(getRoom.rejected, (state) => {
      state.room = null;
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
  },
});

export const classesReducer = classesSlice.reducer;
