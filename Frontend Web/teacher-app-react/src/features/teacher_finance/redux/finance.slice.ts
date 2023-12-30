import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import FINANCE_KEY from "../constants/finance.keys";
import { getSalaryApi } from "../api/finance.api";
import { FinanceState } from "../types/finance.types";

const initialState: FinanceState = {
  salary: null,
};

export const getSalary = createAsyncThunk(
  `${FINANCE_KEY}/getSalary`,
  async (params: RequestParams) => {
    const response = await getSalaryApi(params);
    return response.data.data;
  }
);

const financeSlice = createSlice({
  name: FINANCE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSalary.fulfilled, (state, action) => {
      state.salary = action.payload;
    });
    builder.addCase(getSalary.rejected, (state) => {
      state.salary = null;
    });
  },
});

export const financeReducer = financeSlice.reducer;
