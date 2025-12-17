import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "../../../api/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await loginUserAPI({ email, password });
      return user;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const storedUser = JSON.parse(localStorage.getItem("user"));
if (storedUser) {
  initialState.user = storedUser;
  initialState.isAuthenticated = true;
}


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
      localStorage.removeItem("user");
      document.cookie = "access_token=; Max-Age=0; path=/;";
    },
    decrementXP(state, action) {
      if (state.user) {
        const newXP = Math.max(0, state.user.xp - action.payload);
        state.user = { ...state.user, xp: newXP };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    
    incrementXP(state, action) {
      if (state.user) {
        const newXP = state.user.xp + action.payload;
        state.user = { ...state.user, xp: newXP }; // create new object for reactivity
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    
    setUserXP(state, action) {
      if (state.user) {
        state.user = { ...state.user, xp: action.payload };
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