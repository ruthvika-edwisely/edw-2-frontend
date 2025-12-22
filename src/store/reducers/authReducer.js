import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions/authActions";

// Helper function to get stored user
const getStoredUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const initialState = {
  user: getStoredUser(),
  loading: false,
  error: null,
  isAuthenticated: !!getStoredUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      document.cookie = "access_token=; Max-Age=0; path=/;";
    },
    decrementXP: (state, action) => {
      const cost = action.payload;
      if (state.user) {
        state.user.xp = Math.max(0, state.user.xp - cost);
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    incrementXP: (state, action) => {
      if (state.user) {
        state.user.xp += action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    setUserXP: (state, action) => {
      if (state.user) {
        state.user.xp = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
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

export const { logout, decrementXP, incrementXP, setUserXP } = authSlice.actions;
export const selectUserXP = (state) => state.auth.user?.xp ?? 0;

export default authSlice.reducer;
