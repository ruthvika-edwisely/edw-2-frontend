import React from "react";
import { Tabs, Tab } from "@mui/material";

const TabsComp = ({
  value,
  onChange,
  tabs = [],              // [{ key, label, color? }]
  variant = "scrollable",
  scrollButtons = "auto",
  colors,
  sx = {},
}) => {
  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v)}
      variant={variant}
      scrollButtons={scrollButtons}
      TabIndicatorProps={{
        sx: {
          height: 3,
          borderRadius: "3px",
          bgcolor: colors?.indicator || "primary.main",
        },
      }}
      sx={{
        mb: 2,
        ".MuiTab-root": {
          textTransform: "none",
          fontWeight: 600,
          color: colors?.text,
          "&.Mui-selected": {
            color: colors?.selected,
          },
          "&:focus": { outline: "none" },
          "&.Mui-focusVisible": { outline: "none" },
        },
        ...sx,
      }}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.key}
          label={tab.label}
          value={tab.key}
          disableRipple
          sx={{
            color: `${tab.color ?? colors?.text}`,
            "&.Mui-selected": {
              color: `${tab.color ?? colors?.selected}`,
            },
          }}
        />
      ))}
    </Tabs>
  );
};

export default React.memo(TabsComp);
