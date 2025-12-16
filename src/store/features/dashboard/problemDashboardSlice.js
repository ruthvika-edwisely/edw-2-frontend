import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProblems } from "../../../api/api";

// Async thunk to fetch problems from API
export const fetchDashboardProblems = createAsyncThunk(
  "dashboard/fetchProblems",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllProblems();
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch problems");
    }
  }
);

const problemDashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dailyChallenge: null,
    problems: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearDashboard(state) {
      state.dailyChallenge = null;
      state.problems = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyChallenge = action.payload.dailyChallenge;
        state.problems = action.payload.problems;
      })
      .addCase(fetchDashboardProblems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboard } = problemDashboardSlice.actions;
export default problemDashboardSlice.reducer;