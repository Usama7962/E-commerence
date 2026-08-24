import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/authApi";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password });

      if (data.user?.role !== "admin") {
        return rejectWithValue("Access denied. Admin only.");
      }

      if (data.accessToken) {
        localStorage.setItem("token", data.accessToken);
      }
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }
      if (data.user?.role) {
        localStorage.setItem("role", data.user.role);
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Login failed, try again"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
    role: typeof window !== "undefined" ? localStorage.getItem("role") : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.token = action.payload.accessToken || null;
        state.role = action.payload.user?.role || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
