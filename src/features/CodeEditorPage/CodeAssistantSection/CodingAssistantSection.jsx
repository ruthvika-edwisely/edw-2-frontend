import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanelVisibility } from '../../../store/features/showAIPanel/showAISlice';
import palette from '../../../theme/palette';
import { Panel } from 'react-resizable-panels';

const CodingAssistantSection = () => {
  const dispatch = useDispatch();
  const mode = palette.mode; // 'light' or 'dark'
  const themeColors = palette.problemPage;

  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hello! How can I help you today?' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'assistant', text: 'Got it! I will help you with that.' }]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
        // borderTopLeftRadius: 8,
        // borderTopRightRadius: 8,
        boxShadow: 3,
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: `1px solid ${themeColors.divider}` }}>
        <Typography variant="h6" sx={{ color: themeColors.textPrimary }}>Coding Assistant</Typography>
        <CloseIcon
          onClick={() => dispatch(togglePanelVisibility())}
          sx={{ cursor: "pointer", color: themeColors.textSecondary }}
        />
      </Box>

      {/* Messages */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', py: 0.5 }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  bgcolor: msg.sender === 'user' ? palette.primary.main : themeColors.chipBg,
                  color: msg.sender === 'user' ? palette.primary.contrastText : themeColors.textPrimary,
                  maxWidth: '70%',
                  borderRadius: 2,
                  boxShadow: msg.sender === 'user' ? 3 : 'none',
                  wordBreak: 'break-word'
                }}
              >
                <ListItemText primary={msg.text} />
              </Paper>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Divider sx={{ borderColor: themeColors.divider }} />

      {/* Input */}
      <Box sx={{ display: 'flex', p: 1, gap: 1, bgcolor: themeColors.cardBg }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: themeColors.chipBg,
              color: themeColors.textPrimary,
              '& fieldset': { borderColor: themeColors.divider },
              '&:hover fieldset': { borderColor: palette.primary.main },
              '&.Mui-focused fieldset': { borderColor: palette.primary.main }
            }
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          sx={{
            bgcolor: palette.primary.main,
            '&:hover': { bgcolor: palette.primary.dark },
            color: palette.primary.contrastText
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
    </Panel>
  );
};

export default CodingAssistantSection;
