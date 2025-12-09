import { configureStore } from "@reduxjs/toolkit";
import problemReducer from "./features/problem/problemSlice.js";
import submissionReducer from "./features/submission/submissionSlice.js";
import showAIReducer from "./features/showAIPanel/showAISlice.js";
import topicReducer from "./features/topic/topicSlice.js";
<<<<<<< HEAD
import authReducer from "./features/auth/authSlice";
=======
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca

export const store = configureStore({
    reducer: {
        problem: problemReducer,
        submissions: submissionReducer,
        showAIPanel: showAIReducer,
        topic: topicReducer,
<<<<<<< HEAD
        auth: authReducer,
=======
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
    }
});