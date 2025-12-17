import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currSubData: null,
    testcaseResults: [],
    runCode: false
};


const submissionSlice = createSlice({
    name: 'submissions',
    initialState,
    reducers: {
        // getUserSubmissionData(state, action) {
        //     const userId = action.payload.userId;
        //     state.allSubs = getUserSubmissions(userId);
        // },

        getLatestSubmissionData(state, action) {
            state.currSubData = action.payload;
            console.log(action.payload);
        },

        getTestcaseResults(state, action) {
            const data = action.payload;
            console.log("data this is it : ", data);
            state.testcaseResults = data
        },

        getSubAnsData(state, action) {
            state.data = action.payload;
            console.log(action.payload);
        },

        getRunStatus(state, action) {
            state.runCode = action.payload;
        }

    }
});


export const { getLatestSubmissionData, getTestcaseResults, getRunStatus } = submissionSlice.actions;
export default submissionSlice.reducer;