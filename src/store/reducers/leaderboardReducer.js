import { createSlice } from "@reduxjs/toolkit";
import { getLeaderboardUsers } from "../actions/leaderboardActions";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderboardUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getLeaderboardUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch leaderboard";
        state.users = [];
      });
  },
});

export default leaderboardSlice.reducer;
