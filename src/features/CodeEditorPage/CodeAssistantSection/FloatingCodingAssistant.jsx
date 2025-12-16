import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Chip,
  Fade,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Close,
  Send,
  Lightbulb,
  SmartToy,
  Person,
  Lock,
  LockOpen,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { togglePanelVisibility } from "../../../store/features/showAIPanel/showAISlice";
import { fetchHints, sendMessage, addUserMessage, unlockHint } from "../../../store/features/showAIPanel/aISlice";

const HINTS = [
  { level: 0, label: "High-level hint", cost: 0 },
  { level: 1, label: "Approach guide", cost: 0 },
  { level: 2, label: "Pseudocode", cost: 5 },
  { level: 3, label: "Debug help", cost: 10 },
];

const FloatingCodingAssistant = ({ problem }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { palette } = theme;

  const endRef = useRef(null);
  const inputRef = useRef(null);

  const [input, setInput] = useState("");
  const [hintOpen, setHintOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const chat = useSelector((state) => state.ai.chats[problem?.id] || {});
  const messages = chat.messages || [];
  const hints = chat.hints || [];
  const unlockedHints = chat.unlockedHints || [];
  const xp = chat.xp || 0;
  const loading = chat.loading || false;

  useEffect(() => {
    if (problem?.id) {
      dispatch(fetchHints({ problemId: problem.id }));
    }
  }, [problem?.id, dispatch]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    dispatch(addUserMessage({ problemId: problem.id, text: input }));
    dispatch(sendMessage({ problemId: problem.id, message: input }));
    setInput("");
  };

  const handleGetHint = async (hint) => {
    const hintData = hints.find((h) => h.level === hint.level);
    if (!hintData) return;

    dispatch(addUserMessage({ problemId: problem.id, text: `Show me ${hint.label}` }));

    const unlocked = await dispatch(unlockHint({ problemId: problem.id, hintId: hintData.id })).unwrap();
    if (unlocked?.text) {
      dispatch(addUserMessage({ problemId: problem.id, text: unlocked.text, sender: "ai" }));
    }

    setHintOpen(false);
  };

  return (
    <Box sx={{ position: "fixed", bottom: 0, right: 20, width: 420, zIndex: 1400 }}>
      <Paper
        elevation={8}
        sx={{
          height: isMinimized ? 60 : 600,
          display: "flex",
          flexDirection: "column",
          borderRadius: "16px 16px 0 0",
          overflow: "hidden",
          bgcolor: palette.background.paper,
          border: `1px solid ${palette.problemPage.cardBorder}`,
        }}
      >
        {/* Header */}
        <Box
          onClick={() => setIsMinimized(!isMinimized)}
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: palette.gradients.primary,
            color: palette.primary.contrastText,
            cursor: "pointer",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar sx={{ bgcolor: palette.action.hover }}>
              <SmartToy fontSize="small" />
            </Avatar>
            <Box>
              <Typography fontWeight={700}>AI Coding Assistant</Typography>
              <Typography fontSize="0.7rem">{problem?.title || "Ready to help"}</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Chip
              label={`${xp} XP`}
              size="small"
              sx={{ bgcolor: palette.problemPage.xpBg, color: palette.xp.primary, fontWeight: 700 }}
            />
            <IconButton size="small" sx={{ color: "inherit" }}>
              {isMinimized ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "inherit" }}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(togglePanelVisibility());
              }}
            >
              <Close />
            </IconButton>
          </Box>
        </Box>

        {!isMinimized && (
          <>
            {/* Messages */}
            <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: palette.background.default }}>
              {messages.length === 0 && !loading && (
                <Box sx={{ mt: 5, textAlign: "center", color: palette.text.secondary }}>
                  <SmartToy sx={{ fontSize: 42, mb: 1, opacity: 0.7 }} />
                  <Typography fontWeight={600}>I’m here to help 🙂</Typography>
                  <Typography variant="body2">Ask a question or unlock a hint 💡</Typography>
                </Box>
              )}

              {messages.map((m, i) => {
                const isUser = m.sender === "user";
                const isSystem = m.sender === "system";
                return (
                  <Fade in key={i}>
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        justifyContent: isUser ? "flex-end" : "flex-start",
                        gap: 1,
                      }}
                    >
                      {!isUser && !isSystem && (
                        <Avatar sx={{ bgcolor: palette.primary.main }}>
                          <SmartToy fontSize="small" />
                        </Avatar>
                      )}
                      <Paper
                        sx={{
                          p: 1.5,
                          maxWidth: "75%",
                          bgcolor: isSystem ? palette.warning[100] : isUser ? palette.primary.main : palette.problemPage.cardBg,
                          color: isUser ? palette.primary.contrastText : palette.text.primary,
                          borderRadius: 2,
                        }}
                      >
                        <Typography variant="body2" whiteSpace="pre-wrap">
                          {m.text}
                        </Typography>
                      </Paper>
                      {isUser && (
                        <Avatar sx={{ bgcolor: palette.success[600] }}>
                          <Person fontSize="small" />
                        </Avatar>
                      )}
                    </Box>
                  </Fade>
                );
              })}

              {loading && (
                <Box sx={{ display: "flex", gap: 1 }}>
                  <CircularProgress size={16} />
                  <Typography color={palette.text.secondary}>Thinking…</Typography>
                </Box>
              )}

              <div ref={endRef} />
            </Box>

            <Divider />

            {/* Hint Panel */}
            {hintOpen && (
              <Box sx={{ p: 2, bgcolor: palette.background.paper }}>
                {HINTS.map((hint) => {
                  const unlocked = unlockedHints.includes(hint.level);
                  const canAfford = xp >= hint.cost;
                  const next = hint.level === unlockedHints.length;

                  return (
                    <Button
                      key={hint.level}
                      fullWidth
                      disabled={!unlocked && (!next || !canAfford)}
                      onClick={() => handleGetHint(hint)}
                      startIcon={unlocked ? <LockOpen /> : <Lock />}
                      sx={{
                        mb: 1,
                        justifyContent: "space-between",
                        bgcolor: unlocked ? "transparent" : palette.primary.main,
                        color: unlocked ? palette.primary.main : palette.primary.contrastText,
                        border: unlocked ? `1px solid ${palette.primary.main}` : "none",
                      }}
                    >
                      {hint.label}
                      {hint.cost > 0 && (
                        <Chip label={`${hint.cost} XP`} size="small" sx={{ bgcolor: palette.xp.primary, color: palette.common.white }} />
                      )}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Input */}
            <Box sx={{ p: 2, bgcolor: palette.background.paper }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask a question or request help…"
                  inputRef={inputRef}
                  multiline
                  maxRows={3}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: palette.problemPage.cardBg,
                      color: palette.problemPage.textPrimary,
                      borderRadius: 2,
                      "& fieldset": { borderColor: palette.problemPage.cardBorder },
                      "&:hover fieldset": { borderColor: palette.primary.main },
                      "&.Mui-focused fieldset": { borderColor: palette.primary.main, borderWidth: 2 },
                      "&.Mui-disabled": { backgroundColor: palette.grey[200], color: palette.text.disabled },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: palette.problemPage.textTertiary,
                      opacity: 1,
                    },
                  }}
                />
                <IconButton onClick={() => setHintOpen((p) => !p)} sx={{ bgcolor: palette.grey[200] }}>
                  <Lightbulb />
                </IconButton>
                <IconButton
                  disabled={!input.trim()}
                  onClick={handleSend}
                  sx={{ bgcolor: palette.primary.main, color: palette.primary.contrastText }}
                >
                  <Send />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default FloatingCodingAssistant;
