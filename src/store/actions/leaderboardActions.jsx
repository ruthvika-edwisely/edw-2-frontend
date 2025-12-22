import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "../../api/api.js";

// Async thunk to fetch leaderboard users
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
