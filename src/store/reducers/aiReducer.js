import { createSlice } from "@reduxjs/toolkit";
import { fetchHints, sendMessage, unlockHint } from "../actions/aiActions";

const initialState = { chats: {} };

const ensureChat = (state, problemId) => {
  if (!state.chats[problemId]) {
    state.chats[problemId] = { messages: [], hints: [], unlockedHints: [], xp: 50, loading: false, error: null };
  }
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      const { problemId, text } = action.payload;
      ensureChat(state, problemId);
      state.chats[problemId].messages.push({ sender: "user", text });
    },
  },
  extraReducers: (builder) => {
    builder
      /* fetchHints */
      .addCase(fetchHints.pending, (state, action) => {
        ensureChat(state, action.meta.arg.problemId);
        state.chats[action.meta.arg.problemId].loading = true;
      })
      .addCase(fetchHints.fulfilled, (state, action) => {
        const { problemId, data } = action.payload;
        ensureChat(state, problemId);
        state.chats[problemId].hints = data;
        state.chats[problemId].loading = false;
      })
      .addCase(fetchHints.rejected, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].loading = false;
        state.chats[problemId].error = action.error.message;
      })
      /* sendMessage */
      .addCase(sendMessage.pending, (state, action) => {
        ensureChat(state, action.meta.arg.problemId);
        state.chats[action.meta.arg.problemId].loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { problemId, text } = action.payload;
        ensureChat(state, problemId);
        state.chats[problemId].messages.push({ sender: "assistant", text });
        state.chats[problemId].loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].loading = false;
        state.chats[problemId].error = action.payload;
        state.chats[problemId].messages.push({ sender: "assistant", text: "⚠️ Something went wrong. Please try again." });
      })
      /* unlockHint */
      .addCase(unlockHint.fulfilled, (state, action) => {
        const { problemId, hint, remainingXP } = action.payload;
        ensureChat(state, problemId);
        const chat = state.chats[problemId];
        const idx = chat.hints.findIndex(h => h.id === hint.id);
        if (idx !== -1) chat.hints[idx] = hint;
        if (!chat.unlockedHints.includes(hint.level)) chat.unlockedHints.push(hint.level);
        chat.xp = remainingXP;
        chat.messages.push({ sender: "assistant", text: hint.content });
      })
      .addCase(unlockHint.rejected, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].messages.push({ sender: "assistant", text: "⚠️ Failed to unlock hint." });
      });
  },
});

export const { addUserMessage } = aiSlice.actions;
export default aiSlice.reducer;
