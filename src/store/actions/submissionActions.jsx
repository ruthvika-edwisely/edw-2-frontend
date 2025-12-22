import {
  setLatestSubmissionData,
  setSubmissionAnswerData,
  setTestcaseResults,
  setRunStatus,
  setSubmitStatus,
} from "../reducers/submissionReducer";

import { getSubmissionById, submitCode } from "../../api/api.js";


export const fetchSubmissionById = (submissionId) => {
  return async (dispatch) => {
    try {
      const data = await getSubmissionById(submissionId);
      dispatch(setLatestSubmissionData(data));
    } catch (err) {
      console.error("Error fetching submission:", err);
    }
  };
};


export const fetchSubmissionAnswerData = (submissionId) => {
  return async (dispatch) => {
    try {
      const data = await getSubmissionById(submissionId); // or specific API for subAns
      dispatch(setSubmissionAnswerData(data));
    } catch (err) {
      console.error("Error fetching submission answers:", err);
    }
  };
};


export const submitCodeAction = (submissionData) => {
  return async (dispatch) => {
    try {
      dispatch(setSubmitStatus(true));
      await submitCode(submissionData);
      dispatch(setSubmitStatus(false));
    } catch (err) {
      dispatch(setSubmitStatus(false));
      console.error("Error submitting code:", err);
    }
  };
};


export const updateTestcaseResults = (results) => {
  return (dispatch) => {
    dispatch(setTestcaseResults(results));
  };
};


export const updateRunStatus = (status) => {
  return (dispatch) => {
    dispatch(setRunStatus(status));
  };
};
