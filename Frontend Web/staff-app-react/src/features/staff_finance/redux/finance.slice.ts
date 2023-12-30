import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import { AcceptOrRejectSpending, CreateEditSpending, FinanceState, TakeNoteTuition } from "../types/finance.types";
import { acceptOrRejectSpendingApi, confirmPaymentApi, createSpendingApi, deleteSpendingApi, getMySalaryApi, getSpendingByIdApi, getSpendingsApi, getStudentTuitionInformationApi, takeNoteTuitionApi, updateSpendingApi } from "../api/finance.api";
import FINANCE_KEY from "../constants/finance.keys";

const initialState: FinanceState = {
  spendings: null,
  spending: null,
  studentTuition: null,
  salary: null,
};

export const getSpendings = createAsyncThunk(
  `${FINANCE_KEY}/getSpendings`,
  async (params: RequestParams) => {
    const response = await getSpendingsApi(params);
    return response.data.data;
  }
);

export const getSpendingById = createAsyncThunk(
  `${FINANCE_KEY}/getSpendingById`,
  async (id: number) => {
    const response = await getSpendingByIdApi(id);
    console.log(response.data.data)
    return response.data.data;
  }
);

export const createSpending = createAsyncThunk(
  `${FINANCE_KEY}/createSpending`,
  async (data: CreateEditSpending) => {
    return createSpendingApi(data);
  }
);

export const updateSpending = createAsyncThunk(
  `${FINANCE_KEY}/updateSpending`,
  async (data: CreateEditSpending) => {
    const { id, ...fields } = data;
    return updateSpendingApi(Number(id), fields);
  }
);

export const acceptOrRejectSpending = createAsyncThunk(
  `${FINANCE_KEY}/acceptOrRejectSpending`,
  async (data : AcceptOrRejectSpending) => {
    const { id, status } = data;
    return acceptOrRejectSpendingApi(Number(id), status );
  }
);

export const deleteSpending = createAsyncThunk(
  `${FINANCE_KEY}/deleteSpending`,
  async (id: number) => {
    return deleteSpendingApi(id);
  }
);

export const getStudentTuitionInformation = createAsyncThunk(
  `${FINANCE_KEY}/getStudentTuitionInformation`,
  async (params: RequestParams) => {
    const response = await getStudentTuitionInformationApi(params);
    return response.data.data;
  }
);

export const confirmPayment = createAsyncThunk(
  `${FINANCE_KEY}/confirmPayment`,
  async (id: number) => {
    return confirmPaymentApi(id);
  }
);

export const takeNoteTuition = createAsyncThunk(
  `${FINANCE_KEY}/takeNoteTuition`,
  async (data: TakeNoteTuition) => {
    const { id, note } = data;
    return takeNoteTuitionApi(Number(id), note);
  }
);

export const getMySalary = createAsyncThunk(
  `${FINANCE_KEY}/getMySalary`,
  async (params: RequestParams) => {
    const response = await getMySalaryApi(params);
    return response.data.data;
  }
);

const financeSlice = createSlice({
  name: FINANCE_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpendings.fulfilled, (state, action) => {
      state.spendings = action.payload;
    });
    builder.addCase(getSpendings.rejected, (state) => {
      state.spendings = null;
    });
    builder.addCase(getSpendingById.fulfilled, (state, action) => {
      state.spending = action.payload;
    });
    builder.addCase(getSpendingById.rejected, (state) => {
      state.spending = null;
    });
    builder.addCase(getStudentTuitionInformation.fulfilled, (state, action) => {
      state.studentTuition = action.payload;
    });
    builder.addCase(getStudentTuitionInformation.rejected, (state) => {
      state.studentTuition = null;
    });
    builder.addCase(getMySalary.fulfilled, (state, action) => {
      state.salary = action.payload;
    });
    builder.addCase(getMySalary.rejected, (state) => {
      state.salary = null;
    });
  },
});

export const financeReducer = financeSlice.reducer;
