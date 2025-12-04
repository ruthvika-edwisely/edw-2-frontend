import React, { useState } from 'react';
import { Panel } from 'react-resizable-panels';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Tabs,
  Tab
} from '@mui/material';

const TestcasesBlock = ({ testcases }) => {
  const visibleTestcases =
    testcases
      ?.filter(tc => !tc.isHidden)
      ?.sort((a, b) => a.orderIndex - b.orderIndex) ?? [];

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Panel defaultSize={35} minSize={5}>
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mt: 2,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Test Cases
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 2 }}
        >
          {visibleTestcases.map((tc, index) => (
            <Tab key={tc.id} label={`Testcase ${index + 1}`} />
          ))}
        </Tabs>

        {/* Content */}
        <Box sx={{ display: "flex", overflowY: 'auto', pr: 1, width: "100%" }}>
          {visibleTestcases.length > 0 && visibleTestcases[tabIndex] && (
            <Box sx={{ display: 'flex', gap: 2, width: "100%", flexDirection: "column" }}>
              {/* INPUT BLOCK */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Input :
                </Typography>
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: 'grey.100',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    display: "flex",
                    flexDirection: "column",
                  }}
                  elevation={0}
                >
                  {visibleTestcases[tabIndex].input}
                </Paper>
              </Box>

              {/* OUTPUT BLOCK */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Expected Output :
                </Typography>
                <Paper
                  sx={{
                    p: 1,
                    bgcolor: 'grey.100',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap'
                  }}
                  elevation={0}
                >
                  {visibleTestcases[tabIndex].expectedOutput}
                </Paper>
              </Box>
            </Box>
          )}

          {/* If no visible testcases */}
          {visibleTestcases.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No visible testcases available.
            </Typography>
          )}
        </Box>
      </Paper>
    </Panel>
  );
};

export default TestcasesBlock;
