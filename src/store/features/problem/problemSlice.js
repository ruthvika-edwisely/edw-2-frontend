import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    tags: [],
    hints: [],
    constraints: [],
    editorial: {},
    testcases: [],
    snippets: [],
    submissions: []
};

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        getProblemData(state, action) {
            const {id, data} = action.payload;
            const problemId = id;
            state.id = id
            state.data = data;
            state.tags = data.tags;
            state.hints = data.hints;
            state.constraints = data.constraints;
            state.editorial = data.editorial;
            state.testcases = data.testcases;
            state.snippets = data.snippets;
            state.submissions = data.submissions;
        }
    }
});


export const { getProblemData } = problemSlice.actions;
export default problemSlice.reducer;