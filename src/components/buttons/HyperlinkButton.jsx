import React from "react";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function HyperlinkButton({ label, to, sx, ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Link
      component="button"
      onClick={handleClick}
      sx={{ textDecoration: "none", ...sx }}
      {...props}
    >
      {label}
    </Link>
  );
}
