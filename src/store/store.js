import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./features/problem/problemSlice.js";
import submissionReducer from "./features/submission/submissionSlice.js";
import showAIReducer from "./reducers/showAIReducer.js";
import authReducer from "./reducers/authReducer";
import activeTabReducer from "./features/activeTabSlice.js";
import aiReducer from "./reducers/aiReducer.js";
import topicDashboardReducer from "./reducers/topicDashboardReducer.js";
import dashboardReducer from "./reducers/dashboardReducer.js"; // ✅ new
import leaderboardReducer from "./reducers/leaderboardReducer.js";



export const store = configureStore({
  reducer: {
    problem: problemReducer,
    submissions: submissionReducer,
    ai: aiReducer,
    showAIPanel: showAIReducer,
    topicDashboard: topicDashboardReducer,
    auth: authReducer,
    dashboard: dashboardReducer, 
    leaderboard: leaderboardReducer,
    activeTab: activeTabReducer
  },
});
