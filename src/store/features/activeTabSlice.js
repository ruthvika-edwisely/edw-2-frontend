import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tabIndex: 0
}


const activeTabSlice = createSlice({
    name: 'activeTab',
    initialState,
    reducers: {
        updateTabIndex(state, action) {
            state.tabIndex = action.payload;
        }
    }
});



export const { updateTabIndex } = activeTabSlice.actions;
export default activeTabSlice.reducer;