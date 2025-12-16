import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../api/api";
import { sendAIMessageAPI } from "../../../api/api";

// =========================
// Async Thunks
// =========================

export const fetchHints = createAsyncThunk(
  "ai/fetchHints",
  async ({ problemId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user?.id || null;

    const data = await api.getProblemHints(problemId, userId);
    return { problemId, data };
  }
);

export const unlockHint = createAsyncThunk(
  "ai/unlockHint",
  async ({ hintId, problemId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user?.id;

    if (!userId) return thunkAPI.rejectWithValue("User not logged in");

    const res = await api.unlockHintAPI({ userId, hintId });
    if (!res.success) throw new Error(res.message || "Failed to unlock hint");

    return { problemId, ...res.data };
  }
);

export const sendMessage = createAsyncThunk(
  "ai/sendMessage",
  async ({ message, problemId, code }) => {
    const res = await sendAIMessageAPI({ problemId, message, code });
    return { problemId, response: res.message }; // use `res.message`
  }
);


// =========================
// Initial State
// =========================

const initialState = {
  chats: {}, // { [problemId]: { messages, hints, unlockedHints, xp, loading, error } }
};

// =========================
// Helper
// =========================

const ensureChat = (state, problemId) => {
  if (!state.chats[problemId]) {
    state.chats[problemId] = {
      messages: [
        { sender: "assistant", text: "Hi! I'm your coding assistant. How can I help you?" },
      ],
      hints: [],
      unlockedHints: [],
      xp: 50,
      loading: false,
      error: null,
    };
  }
};

// =========================
// Slice
// =========================

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    addUserMessage: (state, action) => {
      const { problemId, text } = action.payload;
      ensureChat(state, problemId);
      state.chats[problemId].messages.push({ sender: "user", text });
    },
    addAssistantMessage: (state, action) => {
      const { problemId, text } = action.payload;
      ensureChat(state, problemId);
      state.chats[problemId].messages.push({ sender: "assistant", text });
    },
    deductXp: (state, action) => {
      const { problemId, amount } = action.payload;
      ensureChat(state, problemId);
      state.chats[problemId].xp -= amount;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Hints
      .addCase(fetchHints.pending, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].loading = true;
      })
      .addCase(fetchHints.fulfilled, (state, action) => {
        const { problemId, data } = action.payload;
        ensureChat(state, problemId);
        state.chats[problemId].loading = false;
        state.chats[problemId].hints = data;
      })
      .addCase(fetchHints.rejected, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].loading = false;
        state.chats[problemId].error = action.error.message;
      })

      // Send Message
      .addCase(sendMessage.pending, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { problemId, response } = action.payload;
        ensureChat(state, problemId);
        state.chats[problemId].loading = false;
        state.chats[problemId].messages.push({ sender: "assistant", text: response });
      })
      .addCase(sendMessage.rejected, (state, action) => {
        const { problemId } = action.meta.arg;
        ensureChat(state, problemId);
        state.chats[problemId].loading = false;
        state.chats[problemId].messages.push({ sender: "assistant", text: "⚠️ Something went wrong." });
      })

      // Unlock Hint
      .addCase(unlockHint.fulfilled, (state, action) => {
        const { problemId, hint, remainingXP } = action.payload;
        ensureChat(state, problemId);

        const chat = state.chats[problemId];

        const index = chat.hints.findIndex(h => h.id === hint.id);
        if (index !== -1) chat.hints[index] = hint;

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

export const { addUserMessage, addAssistantMessage, deductXp } = aiSlice.actions;
export default aiSlice.reducer;
