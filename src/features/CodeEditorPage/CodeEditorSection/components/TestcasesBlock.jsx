import React, { useState } from "react";
import { Panel } from "react-resizable-panels";
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import IOSection from "../../components/IOSection.jsx";
import TestcasesBlockSkeleton from "../../components/skeletons/TestcasesBlockSkeleton.jsx";
import TabsComp from "../../components/TabsComp.jsx";


const TestcasesBlock = () => {
  const theme = useTheme();
  const p = theme.palette.problemPage;

  const successColor = theme.palette.success[600];
  const errorColor = theme.palette.error[600];
  const stderrColor = theme.palette.error[400];

  const runCode = useSelector(state => state.submissions.runCode);
  const testcases = useSelector((state) => state.problem.testcases) ?? [];
  const testcaseResults = useSelector((state) => state.submissions.testcaseResults) ?? [];

  const [tabIndex, setTabIndex] = useState(0);
  const testcaseTabs = testcases.map((tc, index) => {
    const result = testcaseResults[index];

    let color = p.tabText;
    if (result) {
      const passed =
        result.output?.trim() === tc.expected_output?.trim();
      color = passed ? successColor : errorColor;
    }

    return {
      key: index,
      label: `Testcase ${index + 1}`,
      color,
    };
  });

  const currentTestcase = testcases[tabIndex];
  const currentResult = testcaseResults[tabIndex];
  const isPassed = currentResult && currentResult?.output?.trim() === currentTestcase?.expected_output?.trim();


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

        {runCode ? 
          (<TestcasesBlockSkeleton />) 
          : 
          (<>
            <TabsComp
              value={tabIndex}
              onChange={setTabIndex}
              tabs={testcaseTabs}
              colors={{
                text: p.tabText,
                selected: p.tabSelected,
                indicator: p.tabIndicator,
              }}
            />

            <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
              {!currentTestcase ? 
              (
                <Typography variant="body2" color={p.textSecondary}>
                  No visible testcases available.
                </Typography>
              ) 
              : 
              (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
    
                  <IOSection 
                    sectionHeading={"Input"}
                    sectionData={currentTestcase.input_to_show}
                  />

                  
                  <IOSection 
                    sectionHeading={"Expected Output"}
                    sectionData={currentTestcase.expected_output_to_show}
                  />


                  {currentResult && (
                    <>
                
                      <IOSection 
                        sectionHeading={"Your Output :"}
                        sectionData={currentResult.output?.trim() || "None"}
                      />

                      <IOSection 
                        sectionHeading={"Status :"}
                        sectionData={currentResult.status}
                        blockSx={{
                          whiteSpace: "pre-wrap",
                          fontWeight: 600,
                          color: isPassed ? successColor : errorColor,
                        }}
                      />

                      {currentResult?.stderr && (
                        <IOSection 
                          sectionHeading={"Error"}
                          sectionData={currentResult.stderr}
                          blockSx={{
                            color: stderrColor
                          }}
                        />
                      )}
                    
                    </>
                  )}
                </Box>
              )}
            </Box>
          </>)}
      </Box>
    </Panel>
  );
};
export default TestcasesBlock;