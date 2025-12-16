import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./features/problem/problemSlice.js";
import submissionReducer from "./features/submission/submissionSlice.js";
import showAIReducer from "./features/showAIPanel/showAISlice.js";
import authReducer from "./features/auth/authSlice";
import activeTabReducer from "./features/activeTabSlice.js";
import aiReducer from "./features/showAIPanel/aISlice.js";
import topicDashboardReducer from "./features/topic/topicDashboardSlice.js";
import dashboardReducer from "./features/dashboard/problemDashboardSlice.js"; // ✅ new
import leaderboardReducer from "./features/leaderboard/leaderboardSlice.js";



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
