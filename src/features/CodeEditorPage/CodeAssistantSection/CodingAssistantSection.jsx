import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  IconButton,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  Close,
  Send,
  Lightbulb,
  Code,
  BugReport,
  AutoAwesome,
  Lock,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanelVisibility } from '../../../store/features/showAIPanel/showAISlice';
import { Panel } from 'react-resizable-panels';
import palette from '../../../theme/palette';
import * as aiService from '../../../api/api';


const HINT_LEVELS = [
  { level: 0, name: 'L0 - High-level hint', icon: <Lightbulb />, xpCost: 0, color: '#10b981' },
  { level: 1, name: 'L1 - Approach guide', icon: <AutoAwesome />, xpCost: 0, color: '#6366f1' },
  { level: 2, name: 'L2 - Pseudocode', icon: <Code />, xpCost: -5, color: '#f59e0b' },
  { level: 3, name: 'L3 - Debug help', icon: <BugReport />, xpCost: -10, color: '#ef4444' },
  { level: 4, name: 'L4 - Full solution', icon: <Lock />, xpCost: -25, color: '#8b5cf6' },
];

const CodingAssistantSection = ({ problem, code }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const themeColors = palette.problemPage;

  const [activeTab, setActiveTab] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentHint, setCurrentHint] = useState(null);
  const [unlockedHints, setUnlockedHints] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentHint]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    if (!isAuthenticated) {
      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: input },
        { sender: 'assistant', text: 'Please login to chat with the AI assistant.' },
      ]);
      setInput('');
      return;
    }

    const userMessage = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await aiService.chat(userMessage, problem?.id, code);
      setMessages((prev) => [...prev, { sender: 'assistant', text: response.data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Sorry, I encountered an error. Please try again.' },
      ]);
    }
    setLoading(false);
  };

  const handleGetHint = async (level) => {
    if (!isAuthenticated) {
      setCurrentHint({ hint: 'Please login to use AI hints.', level });
      return;
    }

    setLoading(true);
    try {
      const response = await aiService.getHint(problem.id, level, code);
      setCurrentHint(response.data);
      if (!unlockedHints.includes(level)) setUnlockedHints([...unlockedHints, level]);
    } catch (error) {
      setCurrentHint({ hint: 'Failed to get hint. Please try again.', level });
    }
    setLoading(false);
  };

  return (
    <Panel>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          bgcolor: themeColors.cardBg,
          color: themeColors.textPrimary,
          boxShadow: 3,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            borderBottom: `1px solid ${themeColors.divider}`,
          }}
        >
          <Typography variant="h6" sx={{ color: themeColors.textPrimary }}>
            Coding Assistant
          </Typography>
          <Close
            onClick={() => dispatch(togglePanelVisibility())}
            sx={{ cursor: 'pointer', color: themeColors.textSecondary }}
          />
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          sx={{ borderBottom: `1px solid ${themeColors.divider}` }}
        >
          <Tab label="Chat" />
          <Tab label="Hints" />
        </Tabs>

        {/* Chat / Hints */}
        {activeTab === 0 ? (
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
              {messages.length === 0 && !loading ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <AutoAwesome sx={{ fontSize: 48, color: 'rgba(99, 102, 241, 0.3)', mb: 2 }} />
                  <Typography color="text.secondary">Ask AI for help with your code</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try asking about approach, debugging, or optimization
                  </Typography>
                </Box>
              ) : (
                messages.map((msg, index) => (
                  <Box
                    key={index}
                    sx={{
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      mb: 1,
                    }}
                  >
                    <Paper
                      sx={{
                        p: 1.5,
                        bgcolor: msg.sender === 'user' ? palette.primary.main : themeColors.chipBg,
                        color: msg.sender === 'user' ? palette.primary.contrastText : themeColors.textPrimary,
                        borderRadius: 2,
                        wordBreak: 'break-word',
                      }}
                    >
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                        {msg.text}
                      </Typography>
                    </Paper>
                  </Box>
                ))
              )}
              {loading && (
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <CircularProgress size={20} />
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>

            {/* Input */}
            <Box sx={{ display: 'flex', p: 1, gap: 1, borderTop: `1px solid ${themeColors.divider}` }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Ask AI for help..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: themeColors.chipBg,
                    color: themeColors.textPrimary,
                    '& fieldset': { borderColor: themeColors.divider },
                    '&:hover fieldset': { borderColor: palette.primary.main },
                    '&.Mui-focused fieldset': { borderColor: palette.primary.main },
                  },
                }}
              />
              <IconButton
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
                sx={{ bgcolor: palette.primary.main, color: palette.primary.contrastText, '&:hover': { bgcolor: palette.primary.dark } }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        ) : (
          // Hints Tab
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            {HINT_LEVELS.map((hint) => (
              <Button
                key={hint.level}
                variant="outlined"
                onClick={() => handleGetHint(hint.level)}
                disabled={loading}
                sx={{
                  justifyContent: 'space-between',
                  borderColor: unlockedHints.includes(hint.level) ? hint.color : 'rgba(255,255,255,0.1)',
                  backgroundColor: unlockedHints.includes(hint.level) ? `${hint.color}20` : 'transparent',
                  color: unlockedHints.includes(hint.level) ? hint.color : 'text.secondary',
                  mb: 1,
                  '&:hover': { borderColor: hint.color, backgroundColor: `${hint.color}10` },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {hint.icon} {hint.name}
                </Box>
                {hint.xpCost !== 0 && (
                  <Chip
                    label={`${hint.xpCost} XP`}
                    size="small"
                    sx={{ backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '0.7rem', height: 20 }}
                  />
                )}
              </Button>
            ))}

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <CircularProgress size={24} />
              </Box>
            )}

            {currentHint && !loading && (
              <Paper sx={{ p: 2, backgroundColor: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: '#818cf8' }}>
                  Assistant
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                  {currentHint.hint}
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Paper>
    </Panel>
  );
};

export default CodingAssistantSection;
