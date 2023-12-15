import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AUTH_KEY from "../constants/auth.keys";
import {
  AuthState,
  LoginRequestBody,
  LoginResponse,
  TokenInfo,
} from "../types/auth.types";
import { loginApi, logoutApi, refreshTokenApi } from "../teacher_auth";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState: AuthState = {
  tokenInfo: null,
  role: null,
  userId: null,
};

export const login = createAsyncThunk(
  `${AUTH_KEY}/login`,
  async (data: LoginRequestBody) => {
    const response = await loginApi(data);
    return response.data.data;
  }
);

export const refreshToken = createAsyncThunk(
  `${AUTH_KEY}/refreshToken`,
  async (data: TokenInfo) => {
    const response = await refreshTokenApi(data);
    return response.data.data;
  }
);

export const logout = createAsyncThunk(`${AUTH_KEY}/logout`, async () => {
  const response = await logoutApi();
  return response.data.data;
});

const authSlice = createSlice({
  name: AUTH_KEY,
  initialState,
  reducers: {
    clearUser(state) {
      state.tokenInfo = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.tokenInfo = null;
      localStorage.clear();
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        state.tokenInfo = action.payload;
        state.role = action.payload.role;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("userId", action.payload.userId);
      }
    );

    // REFRESH TOKEN
    builder.addCase(refreshToken.pending, (state) => {
      state.tokenInfo = null;
      // localStorage.clear();
    });
    builder.addCase(
      refreshToken.fulfilled,
      (state, action: PayloadAction<TokenInfo>) => {
        state.tokenInfo = action.payload;
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    );
    builder.addCase(logout.pending, (state) => {
      state.tokenInfo = null;
      localStorage.clear();
    });
  },
});

const authPersistConfig = {
  key: AUTH_KEY,
  storage,
  whitelist: ["tokenInfo"],
};

export const authReducer = persistReducer<AuthState>(
  authPersistConfig,
  authSlice.reducer
);

export const { clearUser } = authSlice.actions;
