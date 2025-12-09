import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {},
    tags: [],
    hints: [],
    constraints: [],
    editorial: {},
    testcases: [],
    snippets: []
};

const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        getProblemData(state, action) {
            const {id, data, hints, constraints, snippets, editorial, testcases, tags} = action.payload;
            const problemId = id;
            state.data = data;
            state.tags = tags;
            state.hints = hints;
            state.constraints = constraints;
            state.editorial = editorial;
            state.testcases = testcases;
            state.snippets = snippets;
        }
    }
});


export const { getProblemData } = problemSlice.actions;
export default problemSlice.reducer;