import { IAuthState } from "@interfaces/auth.interface";
import { APIErrorResponse } from "@interfaces/global.interface";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "@services/auth.service";
import { decodeToken } from "@utils/jwt-decode";
import { isAxiosError } from "axios";

const initialState: IAuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

if (initialState.token) {
  initialState.user = decodeToken(initialState.token);
}

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await loginService(credentials);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (isAxiosError<APIErrorResponse>(error)) {
        return rejectWithValue(
          error.response?.data || { message: "Unknown error" }
        );
      }
      return rejectWithValue({ message: "Unknown error" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = decodeToken(action.payload.token);
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as { message: string }).message || "Error in the log";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
