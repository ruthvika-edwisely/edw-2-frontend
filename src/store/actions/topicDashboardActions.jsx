import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTags } from "../../api/api";

// Fetch only topics (category === "Topic") and take top 5
export const fetchTopics = createAsyncThunk(
  "topicDashboard/fetchTopics",
  async () => {
    const tags = await fetchTags();
    const topics = tags.filter((tag) => tag.category === "Topic");
    return topics.slice(0, 5); // take only top 5
  }
);
