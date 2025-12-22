import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardProblems } from "../actions/dashboardActions";

const initialState = {
  dailyChallenge: null,
  problems: [],
  loading: false,
  error: null,
};

const problemDashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboard: (state) => {
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
