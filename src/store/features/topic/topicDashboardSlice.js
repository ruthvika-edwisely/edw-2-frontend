import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags } from "../../../api/api";

// Fetch only topics (category === "Topic") and take top 5
export const fetchTopics = createAsyncThunk(
  "topicDashboard/fetchTopics",
  async () => {
    const tags = await fetchTags();
    const topics = tags.filter(tag => tag.category === "Topic");
    return topics.slice(0, 5); // take only top 5
  }
);

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
