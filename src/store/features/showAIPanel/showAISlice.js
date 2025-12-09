import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showAI: false
};


const showAISlice = createSlice({
    name: 'showAI',
    initialState,
    reducers: {
        togglePanelVisibility(state) {
            state.showAI = !state.showAI;
        }
    }
});


export const { togglePanelVisibility } = showAISlice.actions;
export default showAISlice.reducer;