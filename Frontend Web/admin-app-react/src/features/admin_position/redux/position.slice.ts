import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import POSITIONS_KEY from "../constants/positions.keys";
import { Position, PositionsState } from "../types/position.types";
import { RequestParams } from "types/param.types";
import { createPositionApi, getPositionApi, getPositionsApi, updatePositionApi } from "../api/position.api";

const initialState: PositionsState = {
  positions: null,
  position: null,
};

export const getPositions = createAsyncThunk(
  `${POSITIONS_KEY}/getPositions`,
  async (params: RequestParams) => {
    const response = await getPositionsApi(params);
    return response.data.data;
  }
);

export const createPosition = createAsyncThunk(
  `${POSITIONS_KEY}/createPosition`,
  async (data: Position) => {
    return createPositionApi(data);
  }
);

export const getPosition = createAsyncThunk(
  `${POSITIONS_KEY}/getPosition`,
  async (id: number) => {
    const response = await getPositionApi(id);
    return response.data;
  }
);

export const updatePosition = createAsyncThunk(
  `${POSITIONS_KEY}/updatePosition`,
  async (position: Position) => {
    const { id, ...fields } = position
    return updatePositionApi(Number(id), fields );
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
    builder.addCase(getPosition.fulfilled, (state, action) => {
      state.position = action.payload;
    });
    builder.addCase(getPosition.rejected, (state) => {
      state.position = null;
    });
  },
});

export const positionsReducer = positionsSlice.reducer;
