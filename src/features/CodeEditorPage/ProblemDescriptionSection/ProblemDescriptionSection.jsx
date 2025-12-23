import { Box, Tab, Tabs, useTheme } from "@mui/material";
import React, { useState } from "react";
import { Panel } from "react-resizable-panels";

import Description from "./components/Description.jsx";
import Editorial from "./components/Editorial.jsx";
import Submissions from "./components/Submissions.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateTabIndex } from "../../../store/features/activeTabSlice.js";
import TabsComp from "../components/TabsComp.jsx";

const ProblemDescriptionSection = () => {


  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.activeTab.tabIndex);

  const setActiveTab = (tabIndex) => {
    dispatch(updateTabIndex(tabIndex));
  };

  const theme = useTheme();
  const pp = theme.palette.problemPage;

  const pageTabs = [
    {
      key: 0,
      label: "Description"
    },
    {
      key: 1,
      label: "Editorial"
    },
    {
      key: 2,
      label: "Submissions"
    },

  ];

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

        <TabsComp
          value={activeTab}
          onChange={setActiveTab}
          variant="fullWidth"
          tabs={pageTabs}
          colors={{
            text: pp.tabText,
            selected: pp.tabSelected,
            indicator: pp.tabIndicator,
          }}
        />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            // p: 3,
            width: "100%",
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