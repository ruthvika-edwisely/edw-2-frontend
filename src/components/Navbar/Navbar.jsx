import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  useTheme,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Bolt as BoltIcon,
  Code as CodeIcon,
} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";


export default function Navbar({ darkMode, setDarkMode }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleThemeToggle = () => setDarkMode(!darkMode);

  const getActiveTab = () => {
    if (location.pathname === '/all-problems') return 'problems';
    return 'dashboard';
  };

  // -----------------------------
  // Avatar Menu
  // -----------------------------
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };
  
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 2, gap: 3, minHeight: 72 }}>
        {/* Logo */}
        <Box
  component={RouterLink}
  to="/"
  sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  }}
>
  <Box
    sx={{
      width: 36,
      height: 36,
      borderRadius: 1,
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CodeIcon sx={{ color: '#fff', fontSize: 20 }} />
  </Box>

  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
    CodeMaster AI
  </Typography>
</Box>


        {/* Tabs */}
        <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
          {['dashboard', 'problems'].map((tab) => (
            <Button
              key={tab}
              component={RouterLink}
              to={tab === 'dashboard' ? '/' : '/all-problems'}
              sx={{
                color: getActiveTab() === tab ? theme.palette.text.primary : theme.palette.text.secondary,
                fontWeight: getActiveTab() === tab ? 600 : 400,
                borderBottom: getActiveTab() === tab ? `2px solid ${theme.palette.primary.main}` : 'none',
                borderRadius: 0,
                px: 2,
                pb: 0.5,
                '&:hover': { backgroundColor: 'transparent', color: theme.palette.text.primary },
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle */}
        <IconButton size="medium" onClick={handleThemeToggle} sx={{ color: theme.palette.text.secondary, ml: 1 }}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* XP Badge */}
        <Chip
          icon={<BoltIcon />}
          label="150"
          sx={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.xp.primary}`,
            color: theme.palette.xp.primary,
            fontWeight: 600,
            fontSize: '0.875rem',
            ml: 1,
            '& .MuiChip-icon': { color: theme.palette.xp.primary, ml: 1, fontSize: 16 },
          }}
        />

        {/* Avatar */}
        <Avatar
          src="https://i.pravatar.cc/150?img=7"
          alt="User Avatar"
          sx={{ width: 36, height: 36, border: `2px solid ${theme.palette.primary.main}`, ml: 1, cursor: 'pointer' }}
          onClick={handleAvatarClick}
        />

        {/* Logout Menu */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
