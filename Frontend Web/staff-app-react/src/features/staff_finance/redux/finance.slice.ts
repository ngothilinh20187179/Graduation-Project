import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RequestParams } from "types/param.types";
import { AcceptOrRejectSpending, CreateEditSpending, CreateEditStaffSalary, CreateEditTeacherSalary, FinanceState, TakeNoteTuition } from "../types/finance.types";
import { acceptOrRejectSpendingApi, confirmPaymentApi, createSpendingApi, createStaffSalaryApi, createTeacherSalaryApi, deleteSpendingApi, deleteStaffSalaryApi, deleteTeacherSalaryApi, editStaffSalaryApi, editTeacherSalaryApi, getAllStaffSalariesApi, getAllTeacherSalariesApi, getMySalaryApi, getSpendingByIdApi, getSpendingsApi, getStaffSalaryByIdApi, getStudentTuitionInformationApi, getTeacherSalaryByIdApi, takeNoteTuitionApi, updateSpendingApi } from "../api/finance.api";
import FINANCE_KEY from "../constants/finance.keys";

const initialState: FinanceState = {
  spendings: null,
  spending: null,
  studentTuition: null,
  salary: null,
  staffSalaries: null,
  teacherSalaries: null,
  teacherSalaryDetail: null,
  staffSalaryDetail: null
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

export const getAllStaffSalaries = createAsyncThunk(
  `${FINANCE_KEY}/getAllStaffSalaries`,
  async (params: RequestParams) => {
    const response = await getAllStaffSalariesApi(params);
    return response.data.data;
  }
);

export const getStaffSalaryById = createAsyncThunk(
  `${FINANCE_KEY}/getStaffSalaryById`,
  async (id: number) => {
    const response = await getStaffSalaryByIdApi(id);
    return response.data.data;
  }
);

export const createStaffSalary = createAsyncThunk(
  `${FINANCE_KEY}/createStaffSalary`,
  async (data: CreateEditStaffSalary) => {
    return createStaffSalaryApi(data);
  }
);

export const editStaffSalary = createAsyncThunk(
  `${FINANCE_KEY}/editStaffSalary`,
  async (data: CreateEditStaffSalary) => {
    const { id, ...fields } = data;
    return editStaffSalaryApi(Number(id), fields);
  }
);

export const getAllTeacherSalaries = createAsyncThunk(
  `${FINANCE_KEY}/getAllTeacherSalaries`,
  async (params: RequestParams) => {
    const response = await getAllTeacherSalariesApi(params);
    return response.data.data;
  }
);

export const getTeacherSalaryById = createAsyncThunk(
  `${FINANCE_KEY}/getTeacherSalaryById`,
  async (id: number) => {
    const response = await getTeacherSalaryByIdApi(id);
    return response.data.data;
  }
);

export const createTeacherSalary = createAsyncThunk(
  `${FINANCE_KEY}/createTeacherSalary`,
  async (data: CreateEditTeacherSalary) => {
    return createTeacherSalaryApi(data);
  }
);

export const editTeacherSalary = createAsyncThunk(
  `${FINANCE_KEY}/editTeacherSalary`,
  async (data: CreateEditTeacherSalary) => {
    const { id, ...fields } = data;
    return editTeacherSalaryApi(Number(id), fields);
  }
);

export const deleteTeacherSalary = createAsyncThunk(
  `${FINANCE_KEY}/deleteTeacherSalary`,
  async (id: number) => {
    return deleteTeacherSalaryApi(id);
  }
);

export const deleteStaffSalary = createAsyncThunk(
  `${FINANCE_KEY}/deleteStaffSalary`,
  async (id: number) => {
    return deleteStaffSalaryApi(id);
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
    builder.addCase(getAllStaffSalaries.fulfilled, (state, action) => {
      state.staffSalaries = action.payload;
    });
    builder.addCase(getAllStaffSalaries.rejected, (state) => {
      state.staffSalaries = null;
    });
    builder.addCase(getAllTeacherSalaries.fulfilled, (state, action) => {
      state.teacherSalaries = action.payload;
    });
    builder.addCase(getAllTeacherSalaries.rejected, (state) => {
      state.teacherSalaries = null;
    });
    builder.addCase(getTeacherSalaryById.fulfilled, (state, action) => {
      state.teacherSalaryDetail = action.payload;
    });
    builder.addCase(getTeacherSalaryById.rejected, (state) => {
      state.teacherSalaryDetail = null;
    });
    builder.addCase(getStaffSalaryById.fulfilled, (state, action) => {
      state.staffSalaryDetail = action.payload;
    });
    builder.addCase(getStaffSalaryById.rejected, (state) => {
      state.staffSalaryDetail = null;
    });
  },
});

export const financeReducer = financeSlice.reducer;
