import { createSlice } from "@reduxjs/toolkit";
import { getUserSubmissions } from "../../../api/api.js";

const initialState = {
    allSubs: [],
    currProbSubs: []
};


const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        getUserSubmissionData(state, action) {
            const userId = action.payload.userId;
            state.allSubs = getUserSubmissions(userId);
        },

        getUserProblemSubmissionData(state, action) {
            const userId = action.payload.userId;
            const problemId = action.payload.id;
            state.currProbSubs = getUserSubmissions(userId).filter((sub) => sub.problemId === problemId)
        }

    }
});


export const { getUserSubmissionData, getUserProblemSubmissionData } = submissionSlice.actions;
export default submissionSlice.reducer;