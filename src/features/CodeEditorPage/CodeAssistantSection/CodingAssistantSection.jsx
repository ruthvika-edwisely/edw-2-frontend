import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { togglePanelVisibility } from '../../../store/features/showAIPanel/showAISlice';
import palette from '../../../theme/palette';
import { Panel } from 'react-resizable-panels';
import { getCodingAssistantResponse } from '../../../api/gemini';
import ReactMarkdown from 'react-markdown';

const CodingAssistantSection = ({ problemContext = null }) => {
  const dispatch = useDispatch();
  const mode = palette.mode;
  const themeColors = palette.problemPage;

  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hello! I\'m your AI coding assistant powered by Gemini. How can I help you with your coding problem today?' },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getCodingAssistantResponse(userMessage, problemContext);
      setMessages((prev) => [...prev, { sender: 'assistant', text: aiResponse }]);
    } catch (error) {
      console.error('AI response error:', error);
      setMessages((prev) => [...prev, { 
        sender: 'assistant', 
        text: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
        boxShadow: 3,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, borderBottom: `1px solid ${themeColors.divider}` }}>
        <Typography variant="h6" sx={{ color: themeColors.textPrimary }}>Coding Assistant</Typography>
        <CloseIcon
          onClick={() => dispatch(togglePanelVisibility())}
          sx={{ cursor: "pointer", color: themeColors.textSecondary }}
        />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', py: 0.5, alignItems: 'flex-start' }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  bgcolor: msg.sender === 'user' ? palette.primary.main : themeColors.chipBg,
                  color: msg.sender === 'user' ? palette.primary.contrastText : themeColors.textPrimary,
                  maxWidth: '85%',
                  borderRadius: 2,
                  boxShadow: msg.sender === 'user' ? 3 : 'none',
                  wordBreak: 'break-word',
                  '& pre': {
                    backgroundColor: themeColors.codeBg,
                    padding: '8px',
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '0.85rem',
                  },
                  '& code': {
                    backgroundColor: themeColors.codeBg,
                    padding: '2px 4px',
                    borderRadius: '2px',
                    fontSize: '0.85rem',
                  },
                }}
              >
                {msg.sender === 'assistant' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  <ListItemText primary={msg.text} />
                )}
              </Paper>
            </ListItem>
          ))}
          {isLoading && (
            <ListItem sx={{ justifyContent: 'flex-start', py: 0.5 }}>
              <Paper
                sx={{
                  p: 1.5,
                  bgcolor: themeColors.chipBg,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CircularProgress size={16} />
                <Typography variant="body2" sx={{ color: themeColors.textSecondary }}>
                  Thinking...
                </Typography>
              </Paper>
            </ListItem>
          )}
          <div ref={messagesEndRef} />
        </List>
      </Box>

      <Divider sx={{ borderColor: themeColors.divider }} />

      <Box sx={{ display: 'flex', p: 1, gap: 1, bgcolor: themeColors.cardBg }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Ask me anything about coding..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          multiline
          maxRows={3}
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
          disabled={isLoading || !input.trim()}
          sx={{
            bgcolor: palette.primary.main,
            '&:hover': { bgcolor: palette.primary.dark },
            '&:disabled': { bgcolor: themeColors.chipBg },
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
