import React, { useState } from "react";
import { Panel } from "react-resizable-panels";
import {
  Box,
  Typography,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const TestcasesBlock = () => {
  const theme = useTheme();
  const p = theme.palette.problemPage;

  const testcases = useSelector((state) => state.problem.testcases);

  const visibleTestcases =
    testcases
      ?.filter((tc) => !tc.isHidden)
      ?.sort((a, b) => a.order - b.order) ?? [];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Panel defaultSize={35} minSize={5} style={{height: "100%"}}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: p.cardBg,
          borderLeft: `1px solid ${p.cardBorder}`,
          p: 2,
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            mb: 1,
            fontWeight: 700,
            color: p.textPrimary,
            fontSize: "1.1rem",
            letterSpacing: "-0.01em",
          }}
        >
          Test Cases
        </Typography>

        <Divider sx={{ mb: 1.5, borderColor: p.divider }} />

        {/* Tabs */}
        <Tabs
          value={tabIndex}
          onChange={(e, v) => setTabIndex(v)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            sx: {
              height: 3,
              borderRadius: "3px",
              bgcolor: p.tabIndicator,
            },
          }}
          sx={{
            mb: 2,
            ".MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              color: p.tabText,
              "&.Mui-selected": {
                color: p.tabSelected,
              },
            },
          }}
        >
          {visibleTestcases.map((tc, index) => (
            <Tab key={tc.id} label={`Testcase ${index + 1}`} />
          ))}
        </Tabs>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: 1,
            width: "100%",
          }}
        >
          {visibleTestcases.length > 0 && visibleTestcases[tabIndex] && (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                width: "100%",
                flexDirection: "column",
              }}
            >
              {/* Input Block */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    // fontWeight: 600,
                    color: p.textTertiary,
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Input :
                </Typography>

                <Box
                  sx={{
                    p: 1.5,
                    background: p.codeBg,
                    borderRadius: 1.5,
                    border: `1px solid ${p.cardBorder}`,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.875rem",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    color: p.textPrimary,
                  }}
                >
                  {visibleTestcases[tabIndex].input.split("\n").map((item) => (<Box sx={{paddingY: "3px"}}>{item}</Box>))}
                </Box>
              </Box>

              {/* Expected Output */}
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 0.5,
                    // fontWeight: 600,
                    color: p.textTertiary,
                    // textTransform: "uppercase",
                    fontSize: "0.75rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  Expected Output :
                </Typography>

                <Box
                  sx={{
                    p: 1.5,
                    background: p.codeBg,
                    borderRadius: 1.5,
                    border: `1px solid ${p.cardBorder}`,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.875rem",
                    overflowX: "auto",
                    whiteSpace: "pre-wrap",
                    color: p.textPrimary,
                  }}
                >
                  {visibleTestcases[tabIndex].expected_output}
                </Box>
              </Box>
            </Box>
          )}

          {/* No Testcases */}
          {visibleTestcases.length === 0 && (
            <Typography variant="body2" color={p.textSecondary}>
              No visible testcases available.
            </Typography>
          )}
        </Box>
      </Box>
    </Panel>
  );
};

export default TestcasesBlock;
