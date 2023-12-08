import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import POSITIONS_KEY from "../constants/positions.keys";
import { PositionsState } from "../types/position.types";
import { RequestParams } from "types/param.types";
import { getPositionsApi } from "../api/position.api";

const initialState: PositionsState = {
  positions: null,
};

export const getPositions = createAsyncThunk(
  `${POSITIONS_KEY}/getPositions`,
  async (params: RequestParams) => {
    const response = await getPositionsApi(params);
    return response.data.data;
  }
);

const positionsSlice = createSlice({
  name: POSITIONS_KEY,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPositions.fulfilled, (state, action) => {
      state.positions = action.payload;
    });
    builder.addCase(getPositions.rejected, (state) => {
      state.positions = null;
    });
  },
});

export const positionsReducer = positionsSlice.reducer;
