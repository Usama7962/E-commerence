import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../api/authApi";

// 1️⃣ API call (Thunk)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await login({ email, password });

      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.user?.role) {
        localStorage.setItem("role", data.user.role);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Login failed, try again"
      );
    }
  }
);

// 2️⃣ Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') : null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
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
        state.token = action.payload.token || null;
        state.role = action.payload.user?.role || null; // ✅ role set
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
