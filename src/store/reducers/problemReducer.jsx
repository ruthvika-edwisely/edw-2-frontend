import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  data: {},
  tags: [],
  hints: [],
  constraints: [],
  editorial: {},
  testcases: [],
  snippets: [],
  submissions: [],
  languages: [],
};

const problemSlice = createSlice({
  name: "problem",
  initialState,
  reducers: {
    // Pure reducer: just updates state
    setProblemData(state, action) {
      const { id, data } = action.payload;
      state.id = id;
      state.data = data;
      state.tags = data.tags;
      state.hints = data.hints;
      state.constraints = data.constraints;
      state.editorial = data.editorial;
      state.testcases = data.testcases;
      state.snippets = data.snippets;
      state.submissions = data.submissions;
      state.languages = data.languages;
    },

    setSubmissionsData(state, action) {
      state.submissions = action.payload;
    },
  },
});

export const { setProblemData, setSubmissionsData } = problemSlice.actions;
export default problemSlice.reducer;
