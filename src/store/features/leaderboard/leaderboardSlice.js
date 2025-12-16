import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../../api/api.js"; // adjust path

export const getLeaderboardUsers = createAsyncThunk(
  "leaderboard/getLeaderboardUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchUsers();
      return users; // array of users
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboardUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLeaderboardUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // ✅ now this is an array
      })
      .addCase(getLeaderboardUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch leaderboard";
        state.users = [];
      });
  },
});

export default leaderboardSlice.reducer;
