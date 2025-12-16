import { Box, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Panel } from "react-resizable-panels";

import Description from "./components/Description.jsx";
import Editorial from "./components/Editorial.jsx";
import Submissions from "./components/Submissions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateTabIndex } from "../../../store/features/activeTabSlice.js";

const ProblemDescriptionSection = () => {


  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.activeTab.tabIndex);

  const setActiveTab = (tabIndex) => {
    dispatch(updateTabIndex(tabIndex));
  };

  const theme = useTheme();
  const pp = theme.palette.problemPage;

  return (
    <Panel minSize={5}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: pp.cardBg,
          color: pp.textPrimary,
          width: "100%"
        }}
      >
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={(e, v) => setActiveTab(v)}
          variant="fullWidth"
          TabIndicatorProps={{
            sx: {
              height: 3,
              borderRadius: "3px",
              bgcolor: pp.tabIndicator,
            },
          }}
          sx={{
            borderBottom: `1px solid ${pp.cardBorder}`,
            ".MuiTab-root": {
              fontWeight: 600,
              textTransform: "none",
              color: pp.tabText,
              "&.Mui-selected": {
                color: pp.tabSelected,
              },
              "&:hover": {
                bgcolor: pp.tabHover,
              },
            },
          }}
        >
          <Tab label="Description" />
          <Tab label="Editorial" />
          <Tab label="Submissions" />
        </Tabs>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            // p: 3,
            width: "100%",     // ensures full width
            bgcolor: pp.cardBg,
          }}
        >
          {activeTab === 0 && <Description />}
          {activeTab === 1 && <Editorial />}
          {activeTab === 2 && <Submissions />}
        </Box>

      </Box>
    </Panel>
  );
};

export default ProblemDescriptionSection;