import React from "react";
import { ToggleButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function ThemeToggleButton({ mode, setMode, sx }) {
  const isDark = mode === "dark";

  const handleToggle = () => {
    setMode(isDark ? "light" : "dark");
  };

  return (
    <ToggleButton
      value="theme-toggle"
      selected={isDark}
      onChange={handleToggle} // simple toggle
      sx={{
        border: "none",
        minWidth: 36,
        width: 36,
        height: 36,
        borderRadius: "50%",
        p: 0,
        color: "text.secondary",
        "&.Mui-selected": {
          color: "text.primary",
          backgroundColor: "action.selected",
        },
        ...sx,
      }}
    >
      {isDark ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
    </ToggleButton>
  );
}
