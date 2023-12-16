import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FINANCE_KEY from "../constants/finance.keys";
import { FinanceState, getMyTuitionDebtInformationApi } from "../student_finance";

const initialState: FinanceState = {
  tuitionDebts: null,
};

export const getMyTuitionDebtInformations = createAsyncThunk(
  `${FINANCE_KEY}/getMyTuitionDebtInformations`,
  async () => {
    const response = await getMyTuitionDebtInformationApi();
    return response.data;
  }
);

const financeSlice = createSlice({
  name: FINANCE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyTuitionDebtInformations.fulfilled, (state, action) => {
      state.tuitionDebts = action.payload;
    });
    builder.addCase(getMyTuitionDebtInformations.rejected, (state) => {
      state.tuitionDebts = null;
    });
  },
});

export const financeReducer = financeSlice.reducer;
