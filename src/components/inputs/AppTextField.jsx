import React from "react";
import { TextField } from "@mui/material";

export default function AppTextField({
  sx,
  InputProps,
  ...props
}) {
  const baseSx = {
    mb: 2,
    input: { color: "#fff" },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.6)",
    },

    "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
      color: "#90caf9",
      backgroundColor: "rgba(15,23,42,1)",
      padding: "0 4px",
      transform: "translate(14px, -6px) scale(0.85)",
    },

    "& .MuiOutlinedInput-root fieldset": {
      borderColor: "rgba(255,255,255,0.15)",
    },

    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
      borderColor: "#60a5fa",
    },

    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  return (
    <TextField
      fullWidth
      sx={{ ...baseSx, ...sx }}
      InputProps={InputProps}
      {...props}
    />
  );
}
