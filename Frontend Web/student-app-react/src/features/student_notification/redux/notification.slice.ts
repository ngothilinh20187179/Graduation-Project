import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import {
  confirmReadNotificationApi,
  createNotificationApi,
  deleteNotificationApi,
  getReceivedNotificationDetailApi,
  getReceivedNotificationsApi,
  getReceiversNotificationApi,
  getSentNotificationDetailApi,
  getSentNotificationsApi,
  markUnMarkNotificationApi,
} from "../student_notification";
import NOTIFICATION_KEY from "../constants/notification.keys";
import {
  CreateNotification,
  NotificationState,
} from "../types/notification.types";
const initialState: NotificationState = {
  receivedNotifications: null,
  receiversNotification: null,
  receivedNotificationDetail: null,
  sentNotificationDetail: null,
  sentNotifications: null,
};

export const getReceivedNotifications = createAsyncThunk(
  `${NOTIFICATION_KEY}/getReceivedNotifications`,
  async (params: RequestParams) => {
    const response = await getReceivedNotificationsApi(params);
    return response.data;
  }
);

export const getSentNotifications = createAsyncThunk(
  `${NOTIFICATION_KEY}/getSentNotifications`,
  async (params: RequestParams) => {
    const response = await getSentNotificationsApi(params);
    return response.data;
  }
);

export const deleteNotification = createAsyncThunk(
  `${NOTIFICATION_KEY}/deleteNotification`,
  async (id: number) => {
    return deleteNotificationApi(id);
  }
);

export const getReceiversNotification = createAsyncThunk(
  `${NOTIFICATION_KEY}/getReceiversNotification`,
  async () => {
    const response = await getReceiversNotificationApi();
    return response.data;
  }
);

export const createNotification = createAsyncThunk(
  `${NOTIFICATION_KEY}/createNotification`,
  async (data: CreateNotification) => {
    return createNotificationApi(data);
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

export const getSentNotificationDetail = createAsyncThunk(
  `${NOTIFICATION_KEY}/getSentNotificationDetail`,
  async (id: number) => {
    const response = await getSentNotificationDetailApi(id);
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
    builder.addCase(getSentNotifications.fulfilled, (state, action) => {
      state.sentNotifications = action.payload;
    });
    builder.addCase(getSentNotifications.rejected, (state) => {
      state.sentNotifications = null;
    });
    builder.addCase(getReceiversNotification.fulfilled, (state, action) => {
      state.receiversNotification = action.payload;
    });
    builder.addCase(getReceiversNotification.rejected, (state) => {
      state.receiversNotification = null;
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
    builder.addCase(
      getSentNotificationDetail.fulfilled,
      (state, action) => {
        state.sentNotificationDetail = action.payload;
      }
    );
    builder.addCase(getSentNotificationDetail.rejected, (state) => {
      state.sentNotificationDetail = null;
    });
  },
});

export const notificationReducer = notificationSlice.reducer;
