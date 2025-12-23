import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
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
import { logout } from "../../store/reducers/authReducer";
import SwitchTabs from "../../components/tabs/SwitchTabs"; // import TabsList
import TagChip from "../../components/chips/TagChip"; // adjust path
import ThemeToggleButton from "../../components/buttons/ThemeToggleButton"; // import ThemeToggleButton
export default function Navbar({ mode, setMode }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth || {});
  const userXp = user?.xp ?? 0;
  const [xpDelta, setXpDelta] = useState(null);
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

  const handleThemeToggle = () =>
    setMode(mode === "light" ? "dark" : "light");

  const handleAvatarClick = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(logout());
    handleCloseMenu();
  };

  // Determine active tab
  const getActiveTab = () => {
    const path = location.pathname;
    if (
      path === "/all-problems" ||
      path.startsWith("/problems") ||
      path.startsWith("/problem")
    )
      return "problems";
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  const tabsData = [
    { key: "dashboard", label: "Dashboard", link: "/" },
    { key: "problems", label: "Problems", link: "/all-problems" },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        width: "100%",
        left: 0,
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          px: { xs: 2, md: 4 },
          minHeight: 72,
          height: 72,
          gap: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflow: "visible",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Box
          component={RouterLink}
          to="/"
          sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", color: "inherit" }}
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
          <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
            CodeMaster AI
          </Typography>
        </Box>

        {/* Tabs using TabsList */}
        <SwitchTabs
  tabs={tabsData}
  activeKey={activeTab}
  onTabChange={(key) => setActiveTab(key)}
  containerSx={{ ml: 2 }}
  tabSx={{ borderRadius: 0, px: 2, pb: 0.5 }}
  activeTabSx={{ color: theme.palette.text.primary, borderBottom: `2px solid ${theme.palette.primary.main}` }}
  inactiveTabSx={{ color: theme.palette.text.secondary }}
  disableFocus={true}
/>


        <Box sx={{ flexGrow: 1 }} />

        {/* Theme Toggle */}
       {/* Theme Toggle */}
<ThemeToggleButton mode={mode} setMode={setMode} />

        {/* XP Badge */}
       

<Box sx={{ position: "relative", ml: 1 }}>
  <TagChip
    icon={<BoltIcon />}
    label={userXp}
    size="large"
    sx={{
      backgroundColor: "transparent",
      border: `1px solid ${theme.palette.xp.primary}`,
      color: theme.palette.xp.primary,
      fontWeight: 600,
      fontSize: 16,
      "& .MuiChip-icon": { color: theme.palette.xp.primary },
    }}
  />
  {xpDelta !== null && (
    <TagChip
      label={`${xpDelta > 0 ? "+" : ""}${xpDelta}`}
      size="small"
      sx={{
        position: "absolute",
        top: -18,
        left: "50%",
        fontSize: 12,
        px: 0.5,
        backgroundColor: "transparent",
        color: xpDelta > 0 ? theme.palette.success.main : theme.palette.error.main,
        animation: "xp-float 700ms ease-out forwards",
        "@keyframes xp-float": {
          "0%": { opacity: 0, transform: "translate(-50%, 8px)" },
          "30%": { opacity: 1 },
          "100%": { opacity: 0, transform: "translate(-50%, -12px)" },
        },
      }}
    />
  )}
</Box>


        {/* Avatar */}
        <Avatar
          src={user?.avatar || "https://i.pravatar.cc/150?img=7"}
          onClick={handleAvatarClick}
          sx={{ width: 36, height: 36, border: `2px solid ${theme.palette.primary.main}`, ml: 1, cursor: "pointer" }}
        />

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{ sx: { mt: 1, minWidth: 180, borderRadius: 2 } }}
        >
          <MenuItem disabled>
            <Typography fontWeight={600}>{user?.name || "User"}</Typography>
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
