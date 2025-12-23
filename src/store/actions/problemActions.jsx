import { setProblemData } from "../reducers/problemReducer";
import { getProblemById } from "../../api/api.js"; // directly using api.js function

// Action dispatched by component
export const getProblemData = (problemId) => {
  return async (dispatch) => {
    try {
      const data = await getProblemById(problemId);

      dispatch(
        setProblemData({
          id: problemId,
          data,
        })
      );
    } catch (err) {
      console.error("Error fetching problem:", err);
    }
  };
};

// Optional: update submissions separately
export const updateSubmissions = (submissions) => {
  return (dispatch) => {
    dispatch(setSubmissionsData(submissions));
  };
};
