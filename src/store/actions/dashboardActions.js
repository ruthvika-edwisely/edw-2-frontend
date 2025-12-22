import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProblems } from "../../api/api";

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
