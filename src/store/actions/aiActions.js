

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";
import { sendAIMessageAPI } from "../../api/api";
import { setUserXP } from "../reducers/authReducer.js";

export const unlockHint = createAsyncThunk(
  "ai/unlockHint",
  async ({ hintId, problemId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user?.id;

    if (!userId) {
      return thunkAPI.rejectWithValue("User not logged in");
    }

    const res = await api.unlockHintAPI({ userId, hintId });

    if (!res.success) {
      throw new Error(res.message || "Failed to unlock hint");
    }

    // 🔥 THIS IS THE FIX
    if (typeof res.data.remainingXP === "number") {
      thunkAPI.dispatch(setUserXP(res.data.remainingXP));
    }

    return { problemId, ...res.data };
  }
);


/* =========================
   Async Thunks
========================= */

export const fetchHints = createAsyncThunk(
  "ai/fetchHints",
  async ({ problemId }, thunkAPI) => {
    const state = thunkAPI.getState();
    const userId = state.auth.user?.id || null;

    const data = await api.getProblemHints(problemId, userId);
    return { problemId, data };
  }
);



export const sendMessage = createAsyncThunk(
  "ai/sendMessage",
  async ({ problemId, message }, thunkAPI) => {
    try {
      if (!message?.trim()) {
        return thunkAPI.rejectWithValue("Empty message");
      }

      const state = thunkAPI.getState();
      const problem = state.problem;

      // ---------- Build full problem context ----------
      const problemContext = {
        id: problem.id || null,
        title: problem.data?.title || "",
        description: Array.isArray(problem.data?.description)
          ? problem.data.description.filter(Boolean).join("\n")
          : problem.data?.description || "",
        difficulty: problem.data?.difficulty || "",
        constraints: problem.constraints?.map(c => ({ content: c.content })) || [],
        hints: problem.hints?.map(h => ({ content: h.content })) || [],
        tags: problem.tags?.map(t => ({ category: t.category, name: t.name })) || [],
        editorial: problem.editorial || {},
        testcases: problem.testcases || [],
        snippets: problem.snippets || [],
        submissions: problem.submissions || [],
        languages: problem.languages || [],
      };

      // ---------- Get saved code ----------
      const userId = state.auth.user?.id;
      const language = state.problem.selectedLanguage?.name || "python";
      const storageKey = `code-user-${userId}-problem-${problem.id}-${language}`;
      const savedCode = localStorage.getItem(storageKey) || "";


      // ---------- Prepare recent chat history ----------
      const chat = state.ai.chats[problemId];
      const history = (chat?.messages || [])
        .slice(-8)
        .map(m => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.text,
        }));
      history.push({ role: "user", content: `Current code:\n${savedCode}` });

      console.log("Sending AI message:", { problemId, message, problemContext, savedCode, history });

      // ---------- Call backend AI API ----------
      const res = await sendAIMessageAPI({
        problemId,
        message,
        context: {
          problem: problemContext,
          code: savedCode,
          history,
        },
      });

      return {
        problemId,
        text: res.data.text,
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "AI request failed");
    }
  }
);


/* =========================
   Initial State
========================= */

const initialState = {
  chats: {}, // { [problemId]: { messages, hints, unlockedHints, xp, loading, error } }
};

/* =========================
   Helper
========================= */

const ensureChat = (state, problemId) => {
  if (!state.chats[problemId]) {
    state.chats[problemId] = {
      messages: [],
      hints: [],
      unlockedHints: [],
      xp: 50,
      loading: false,
      error: null,
    };
  }
};

/* =========================
   Slice
========================= */

