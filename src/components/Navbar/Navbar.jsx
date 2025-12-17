import React, { useState,useEffect } from "react";
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
  Divider,
  useTheme,
} from "@mui/material";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Bolt as BoltIcon,
  Code as CodeIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";

export default function Navbar({ mode, setMode }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth || {});
  const userXp = user?.xp ?? 0;
  const [xpDelta, setXpDelta] = useState(null); // +10 / -5
  const [prevXp, setPrevXp] = useState(userXp);
  useEffect(() => {
    if (userXp !== prevXp) {
      const diff = userXp - prevXp;
      setXpDelta(diff);
  
      const timeout = setTimeout(() => setXpDelta(null), 700);
      setPrevXp(userXp);
  
      return () => clearTimeout(timeout);
    }
  }, [userXp, prevXp]);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  console.log("AUTH USER:", user);


  const handleThemeToggle = () =>
    setMode(mode === "light" ? "dark" : "light");

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  const getActiveTab = () => {
    const path = location.pathname;
  
    if (
      path === "/all-problems" ||
      path.startsWith("/problems") ||
      path.startsWith("/problem")
    ) {
      return "problems";
    }
  
    return "dashboard";
  };
  

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 2, gap: 3, minHeight: 72, overflow: "visible", }}>
        {/* Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: 1,
              backgroundColor: theme.palette.primary.main,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CodeIcon sx={{ color: "#fff", fontSize: 20 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700 ,color: theme.palette.text.primary,}}>
            CodeMaster AI
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ display: "flex", gap: 1, ml: 2 }}>
          {["dashboard", "problems"].map((tab) => {
            const active = getActiveTab() === tab;

            return (
              <Button
                key={tab}
                component={RouterLink}
                to={tab === "dashboard" ? "/" : "/all-problems"}
                sx={{
                  color: active
                    ? theme.palette.text.primary
                    : theme.palette.text.secondary,
                  fontWeight: active ? 600 : 400,
                  borderBottom: active
                    ? `2px solid ${theme.palette.primary.main}`
                    : "2px solid transparent",
                  borderRadius: 0,
                  px: 2,
                  pb: 0.5,
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Button>
            );
          })}
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle */}
        <IconButton onClick={handleThemeToggle}>
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        {/* XP Badge */}
        <Box sx={{ position: "relative", ml: 1 }}>
  {/* Main XP chip */}
  <Chip
    icon={<BoltIcon />}
    label={userXp}
    sx={{
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.xp.primary}`,
      color: theme.palette.xp.primary,
      fontWeight: 600,
      "& .MuiChip-icon": { color: theme.palette.xp.primary },
    }}
  />

  {/* XP Delta Animation */}
  {xpDelta !== null && (
  <Chip
    label={`${xpDelta > 0 ? "+" : ""}${xpDelta}`}
    size="small"
    sx={{
      position: "absolute",
      top: -18,
      left: "50%",
      fontSize: 12,
      px: 0.5,
      backgroundColor: "transparent",
      color:
        xpDelta > 0
          ? theme.palette.success.main
          : theme.palette.error.main,

      animation: "xp-float 700ms ease-out forwards",

      "@keyframes xp-float": {
        "0%": {
          opacity: 0,
          transform: "translate(-50%, 8px)",
        },
        "30%": {
          opacity: 1,
        },
        "100%": {
          opacity: 0,
          transform: "translate(-50%, -12px)",
        },
      },
    }}
  />
)}

</Box>



        {/* Avatar */}
        <Avatar
          src={user?.avatar || "https://i.pravatar.cc/150?img=7"}
          onClick={handleAvatarClick}
          sx={{
            width: 36,
            height: 36,
            border: `2px solid ${theme.palette.primary.main}`,
            ml: 1,
            cursor: "pointer",
          }}
        />

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 180,
              borderRadius: 2,
            },
          }}
        >
          <MenuItem disabled>
            <Typography fontWeight={600}>
              {user?.name || "User"}
            </Typography>
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
