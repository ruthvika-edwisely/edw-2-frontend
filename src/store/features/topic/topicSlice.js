import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTopic: '', // '' = no topic selected
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setSelectedTopic: (state, action) => {
      state.selectedTopic = action.payload;
    },
    clearSelectedTopic: (state) => {
      state.selectedTopic = '';
    },
  },
});

export const { setSelectedTopic, clearSelectedTopic } = topicSlice.actions;
export default topicSlice.reducer;
