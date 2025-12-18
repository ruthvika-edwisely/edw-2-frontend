import React, { useState } from "react";
import { Panel } from "react-resizable-panels";
import {
  Box,
  Typography,
  Divider,
  Tabs,
  Tab,
  Skeleton,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const TestcasesBlock = () => {
  const theme = useTheme();

  const runCode = useSelector(state => state.submissions.runCode);

  const p = theme.palette.problemPage;

  const testcases = useSelector((state) => state.problem.testcases) ?? [];
  const testcaseResults =
    useSelector((state) => state.submissions.testcaseResults) ?? [];

  const [tabIndex, setTabIndex] = useState(0);

  const currentTestcase = testcases[tabIndex];
  const currentResult = testcaseResults[tabIndex];

  const isPassed =
    currentResult &&
    currentResult?.output?.trim() ===
      currentTestcase?.expected_output?.trim();

  const successColor = theme.palette.success[600];
  const errorColor = theme.palette.error[600];
  const stderrColor = theme.palette.error[400];

  return (
    <Panel defaultSize={35} minSize={5} style={{ height: "100%" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          bgcolor: p.cardBg,
          borderLeft: `1px solid ${p.cardBorder}`,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center", 
            width: "100%",
          }}
        >
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 500,
              color: p.textPrimary,
              fontSize: "1rem",
            }}
          >
            Testcases
          </Typography>

          {runCode && (
            <CircularProgress
              size={15} 
              thickness={5}
            />
          )}
        </Box>


        <Divider sx={{ mb: 1.5, borderColor: p.divider }} />

        {runCode ? (
          /* Skeleton Loader */
          <>
            {/* Tabs Skeleton */}
            <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={100}
                  height={36}
                  sx={{
                    borderRadius: 1,
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.08)',
                  }}
                />
              ))}
            </Box>

            {/* Content Skeleton */}
            <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Input Skeleton */}
                <SkeletonBlock />

                {/* Expected Output Skeleton */}
                <SkeletonBlock />

                {/* Your Output Skeleton */}
                <SkeletonBlock />

                {/* Status Skeleton */}
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton
                    variant="text"
                    width={80}
                    height={20}
                    sx={{
                      mb: 0.5,
                      bgcolor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(0, 0, 0, 0.08)',
                    }}
                  />
                  <Box
                    sx={{
                      p: 1.5,
                      background: p.codeBg,
                      borderRadius: 1.5,
                      border: `1px solid ${p.cardBorder}`,
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={24}
                      sx={{
                        bgcolor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.08)' 
                          : 'rgba(0, 0, 0, 0.08)',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          /* Actual Content */
          <>
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
              {testcases.map((tc, index) => {
                const result = testcaseResults[index];
                let tabColor = p.tabText;

                if (result) {
                  const passed =
                    result?.output?.trim() === tc?.expected_output?.trim();
                  tabColor = passed ? successColor : errorColor;
                }

                return (
                  <Tab
                    key={tc.id}
                    label={`Testcase ${index + 1}`}
                    sx={{
                      color: `${tabColor} !important`,
                      "&.Mui-selected": {
                        color: `${tabColor} !important`,
                      },
                    }}
                  />
                );
              })}
            </Tabs>

            {/* Content */}
            <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
              {!currentTestcase ? (
                <Typography variant="body2" color={p.textSecondary}>
                  No visible testcases available.
                </Typography>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Input */}
                  <Block title="Input">
                    {currentTestcase.input_to_show}
                  </Block>

                  {/* Expected Output */}
                  <Block title="Expected Output">
                    {currentTestcase.expected_output_to_show}
                  </Block>

                  {currentResult && (
                    <>
                      {/* Your Output */}
                      <Block title="Your Output">
                        {currentResult.output?.trim() || "None"}
                      </Block>

                      {/* Status */}
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          variant="body2"
                          sx={{
                            mb: 0.5,
                            color: p.textTertiary,
                            fontSize: "0.75rem",
                            letterSpacing: "0.05em",
                          }}
                        >
                          Status :
                        </Typography>

                        <Box
                          sx={{
                            p: 1.5,
                            background: p.codeBg,
                            borderRadius: 1.5,
                            border: `1px solid ${p.cardBorder}`,
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.875rem",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          <Box
                            sx={{
                              fontWeight: 600,
                              color: isPassed ? successColor : errorColor,
                            }}
                          >
                            {currentResult.status}
                          </Box>

                          {currentResult.stderr && (
                            <Box sx={{ mt: 1, color: stderrColor }}>
                              {currentResult.stderr}
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </>
        )}

        <Box></Box>
      </Box>
    </Panel>
  );
};

/* ---------------------- */
/* Reusable Code Block    */
/* ---------------------- */
const Block = ({ title, children }) => {
  const theme = useTheme();
  const p = theme.palette.problemPage;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        variant="body2"
        sx={{
          mb: 0.5,
          color: p.textTertiary,
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
        }}
      >
        {title} :
      </Typography>

      <Box
        sx={{
          p: 1.5,
          background: p.codeBg,
          borderRadius: 1.5,
          border: `1px solid ${p.cardBorder}`,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.875rem",
          whiteSpace: "pre-wrap",
          overflowX: "auto",
          color: p.textPrimary,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

/* ---------------------- */
/* Skeleton Block         */
/* ---------------------- */
const SkeletonBlock = () => {
  const theme = useTheme();
  const p = theme.palette.problemPage;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Skeleton
        variant="text"
        width={120}
        height={20}
        sx={{
          mb: 0.5,
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.08)',
        }}
      />

      <Box
        sx={{
          p: 1.5,
          background: p.codeBg,
          borderRadius: 1.5,
          border: `1px solid ${p.cardBorder}`,
        }}
      >
        <Skeleton
          variant="text"
          width="90%"
          height={20}
          sx={{
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.08)',
          }}
        />
        <Skeleton
          variant="text"
          width="75%"
          height={20}
          sx={{
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.08)',
          }}
        />
      </Box>
    </Box>
  );
};

export default TestcasesBlock;