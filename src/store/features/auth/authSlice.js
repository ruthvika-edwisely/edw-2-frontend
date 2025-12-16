import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserAPI } from "../../../api/api";

// async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginUserAPI({ email, password });
      return user; // direct user object
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// 🔑 initialize from localStorage
const storedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser,
    loading: false,
    error: null,
    isAuthenticated: !!storedUser,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;

      // clear persistence
      localStorage.removeItem("user");

      // clear cookie (your existing logic)
      document.cookie = "access_token=; Max-Age=0; path=/;";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const backendUser = action.payload;
      
        state.user = {
          ...backendUser,
          xp: backendUser.total_xp ?? backendUser.totalXP ?? 0,
        };
      
        state.isAuthenticated = true;
        state.loading = false;
      
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
