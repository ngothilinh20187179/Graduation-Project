import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import SPENDINGS_KEY from "../constants/spending.keys";
import { AcceptOrRejectSpending, SpendingState } from "../types/spending.types";
import { acceptOrRejectSpendingApi, getSpendingsApi } from "../api/spending.api";

const initialState: SpendingState = {
  spendings: null,
};

export const getSpendings = createAsyncThunk(
  `${SPENDINGS_KEY}/getSpendings`,
  async (params: RequestParams) => {
    const response = await getSpendingsApi(params);
    return response.data.data;
  }
);

export const acceptOrRejectSpending = createAsyncThunk(
  `${SPENDINGS_KEY}/acceptOrRejectSpending`,
  async (data : AcceptOrRejectSpending) => {
    const { id, status } = data;
    return acceptOrRejectSpendingApi(Number(id), status );
  }
);

const spendingSlice = createSlice({
  name: SPENDINGS_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpendings.fulfilled, (state, action) => {
      state.spendings = action.payload;
    });
    builder.addCase(getSpendings.rejected, (state) => {
      state.spendings = null;
    });
  },
});

export const spendingReducer = spendingSlice.reducer;
