import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currSubData: null,
  subAnsData: null,
  testcaseResults: [],
  runCode: false,
  submitCodeFlag: false,
};

const submissionSlice = createSlice({
  name: "submission",
  initialState,
  reducers: {
    setLatestSubmissionData(state, action) {
      state.currSubData = action.payload;
    },

    setSubmissionAnswerData(state, action) {
      state.subAnsData = action.payload;
    },

    setTestcaseResults(state, action) {
      state.testcaseResults = action.payload;
    },

    setRunStatus(state, action) {
      state.runCode = action.payload;
    },

    setSubmitStatus(state, action) {
      state.submitCodeFlag = action.payload;
    },
  },
});

// Export reducers
export const {
  setLatestSubmissionData,
  setSubmissionAnswerData,
  setTestcaseResults,
  setRunStatus,
  setSubmitStatus,
} = submissionSlice.actions;

export default submissionSlice.reducer;