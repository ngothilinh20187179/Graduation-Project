import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import {
  confirmReadNotificationApi,
  deleteNotificationApi,
  getReceivedNotificationDetailApi,
  getReceivedNotificationsApi,
  markUnMarkNotificationApi,
} from "../student_notification";
import NOTIFICATION_KEY from "../constants/notification.keys";
import {
  NotificationState,
} from "../types/notification.types";
const initialState: NotificationState = {
  receivedNotifications: null,
  receivedNotificationDetail: null,
};

export const getReceivedNotifications = createAsyncThunk(
  `${NOTIFICATION_KEY}/getReceivedNotifications`,
  async (params: RequestParams) => {
    const response = await getReceivedNotificationsApi(params);
    return response.data;
  }
);

export const deleteNotification = createAsyncThunk(
  `${NOTIFICATION_KEY}/deleteNotification`,
  async (id: number) => {
    return deleteNotificationApi(id);
  }
);

export const markUnMarkNotification = createAsyncThunk(
  `${NOTIFICATION_KEY}/markUnMarkNotification`,
  async (id: number) => {
    return markUnMarkNotificationApi(id);
  }
);

export const getReceivedNotificationDetail = createAsyncThunk(
  `${NOTIFICATION_KEY}/getReceivedNotificationDetail`,
  async (id: number) => {
    const response = await getReceivedNotificationDetailApi(id);
    return response.data.data;
  }
);

export const confirmReadNotification = createAsyncThunk(
  `${NOTIFICATION_KEY}/confirmReadNotification`,
  async (id: number) => {
    return confirmReadNotificationApi(id);
  }
);

const notificationSlice = createSlice({
  name: NOTIFICATION_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getReceivedNotifications.fulfilled, (state, action) => {
      state.receivedNotifications = action.payload;
    });
    builder.addCase(getReceivedNotifications.rejected, (state) => {
      state.receivedNotifications = null;
    });
    builder.addCase(
      getReceivedNotificationDetail.fulfilled,
      (state, action) => {
        state.receivedNotificationDetail = action.payload;
      }
    );
    builder.addCase(getReceivedNotificationDetail.rejected, (state) => {
      state.receivedNotificationDetail = null;
    });
  },
});

export const notificationReducer = notificationSlice.reducer;
