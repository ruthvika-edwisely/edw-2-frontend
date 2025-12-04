import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Panel } from 'react-resizable-panels';

const CodingAssistantSection = () => {
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
    <Panel minSize={5}>
      <Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <Typography variant="h6" sx={{ p: 2, borderBottom: '1px solid #ddd' }}>Coding Assistant</Typography>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
          <List>
            {messages.map((msg, index) => (
              <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <Paper sx={{ p: 1.5, bgcolor: msg.sender === 'user' ? 'primary.main' : 'grey.200', color: msg.sender === 'user' ? 'white' : 'black', maxWidth: '70%' }}>
                  <ListItemText primary={msg.text} />
                </Paper>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        <Divider />
        <Box sx={{ display: 'flex', p: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconButton color="primary" onClick={handleSend}><SendIcon /></IconButton>
        </Box>
      </Paper>
    </Panel> 
  );
};

export default CodingAssistantSection;
