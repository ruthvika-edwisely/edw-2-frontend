import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SwitchTabs({
  tabs = [],                  // Array of { key, label, link? }
  activeKey,                  
  onTabChange,                
  containerSx = {},           
  tabSx = {},                 
  activeTabSx = {},           
  inactiveTabSx = {}, 
  disableFocus = false,        
}) {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", gap: 1, ...containerSx }}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <Button
            key={tab.key}
            onClick={() => {
              onTabChange(tab.key);
              if (tab.link) navigate(tab.link); // navigate if link provided
            }}
            disableRipple={disableFocus}        // disables ripple
            disableFocusRipple={disableFocus}
            sx={{
              ...tabSx,
              ...(isActive ? activeTabSx : inactiveTabSx),
              "&:focus": disableFocus
              ? { outline: "none", boxShadow: "none" } // REMOVE blue ring
              : {},
            }}
          >
            {tab.label}
          </Button>
        );
      })}
    </Box>
  );
}
