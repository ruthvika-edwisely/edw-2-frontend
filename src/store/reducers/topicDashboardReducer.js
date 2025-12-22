import { createSlice } from "@reduxjs/toolkit";
import { fetchTopics } from "../actions/topicDashboardActions";

const topicDashboardSlice = createSlice({
  name: "topicDashboard",
  initialState: {
    topics: [],
    loading: false,
    error: null,
    selectedTopic: null,
  },
  reducers: {
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    clearSelectedTopic: (state) => {
      state.selectedTopic = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopics.fulfilled, (state, action) => {
        state.loading = false;
        state.topics = action.payload;
      })
      .addCase(fetchTopics.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load topics";
      });
  },
});

export const { setSelectedTopic, clearSelectedTopic } =
  topicDashboardSlice.actions;

export default topicDashboardSlice.reducer;
