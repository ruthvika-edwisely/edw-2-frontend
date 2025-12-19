import React from "react";
import { IconButton, useTheme } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";

export default function ThemeToggleButton({ mode, setMode, sx }) {
  const theme = useTheme();

  const handleToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  return (
    <IconButton onClick={handleToggle} sx={sx}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}
