import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import { deleteNotificationApi, getReceivedNotificationsApi } from "../admin_notification";
import NOTIFICATION_KEY from "../constants/notification.keys";
import { NotificationState } from "../types/notification.types";
const initialState: NotificationState = {
  receivedNotifications: null
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
  },
});

export const notificationReducer = notificationSlice.reducer;
