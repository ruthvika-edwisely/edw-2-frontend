import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserAPI } from "../../api/api";

// Async thunk for logging in
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
