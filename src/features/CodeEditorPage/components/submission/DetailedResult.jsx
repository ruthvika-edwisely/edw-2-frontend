import { Box, Button, IconButton, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { formatOutput, getFailedTestCases, getStatusColor, getTestCaseProgress, normalizeStatus } from "../../utils/formatFunctions.js";
import DetailedResultSkeleton from "../skeletons/DetailedResultSkeleton.jsx";
import { ArrowLeft, Clock, Database } from "lucide-react";
import CompHeading from "../CompHeading.jsx";
import MetricCard from "./MetricCard.jsx";
import IOSection from "../IOSection.jsx";
import CodeBlock from "../CodeBlock.jsx";

const DetailedResult = ({latestSubmission, isLoadingDetailedResult, submitCode, handleBackToSubmissions, copied, handleCopy}) => {
    if (!latestSubmission) return null;


    const theme = useTheme();
    const palette = theme.palette.problemPage;

    // Show skeleton while loading
    if (isLoadingDetailedResult || submitCode) {
      return <DetailedResultSkeleton handleBackToSubmissions={handleBackToSubmissions} />
    }

    const progress = getTestCaseProgress(latestSubmission);
    const failedTests = getFailedTestCases(latestSubmission.testcase_results);
    const isAccepted = normalizeStatus(latestSubmission.status) === "Accepted";

    const IOSectionStyles = [
        {
            sectionHeading: "Input",
            sectionData: formatOutput(failedTests[0]?.input),
            sx: {
                color: palette.textPrimary,
                fontSize: "0.938rem",
                fontWeight: 500,
                mb: 2,
            },
            blockSx: {
                backgroundColor: palette.exampleBg,
                borderRadius: "8px",
                p: 2,
                mb: 2,
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: palette.textPrimary,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
            }
        },
        {
            sectionHeading: "Your Output",
            sectionData: formatOutput(failedTests[0]?.output),
            sx: {
                color: palette.textPrimary,
                fontSize: "0.938rem",
                fontWeight: 500,
                mb: 2,
            },
            blockSx: {
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderRadius: "8px",
                p: 2,
                mb: 2,
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: "#ef4444",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
            }
        },
        {
            sectionHeading: "Expected Output",
            sectionData: formatOutput(failedTests[0]?.expected_output),
            sx: {
                color: palette.textPrimary,
                fontSize: "0.938rem",
                fontWeight: 500,
                mb: 2,
            },
            blockSx: {
                backgroundColor: "rgba(34, 197, 94, 0.1)",
                borderRadius: "8px",
                p: 2,
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: "#22c55e",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
            }
        },
        {
            sectionHeading: "Error Message",
            sectionData: formatOutput(failedTests[0]?.stderr),
            sx: {
                color: palette.textPrimary,
                fontSize: "0.938rem",
                fontWeight: 500,
                mb: 2,
            },
            blockSx: {
                backgroundColor: palette.exampleBg,
                borderRadius: "8px",
                p: 2,
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: "#ef4444",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
            }
        },
    ];


    const metricCardData = [
        [
            {
                icon: Clock,
                title: "Runtime",
                data : `${latestSubmission?.totalExecTime ? `${Math.round(latestSubmission.totalExecTime)} ms` : "N/A"}`
            },
            {
                icon: Database,
                title: "Memory",
                data: `${latestSubmission?.totalExecMemory ? `${latestSubmission.totalExecMemory.toFixed(2)} MB` : "N/A"}`
            },
        ],
        [ 
            {
                icon: Clock,
                title: "Time complexity",
                data : `${latestSubmission?.time_complexity ? `${latestSubmission.time_complexity}` : "N/A"}`
            },
            {
                icon: Database,
                title: "Space complexity",
                data: `${latestSubmission?.space_complexity} ? ${latestSubmission.space_complexity} : "N/A"`
            }
        ]
    ];



    return (
      <Box sx={{ mx: "auto" }}>
        {/* Back Button */}
        <Box
          sx={{
            borderBottom: `1px solid ${palette.cardBorder}`
          }}
        >
          <Button
            startIcon={<ArrowLeft size={18} />}
            onClick={handleBackToSubmissions}
            sx={{
              textTransform: "none",
              color: palette.textSecondary,
              fontWeight: 600,
              fontSize: "0.875rem",
              "&:hover": {
                backgroundColor: palette.exampleBg,
              },
            }}
          >
            All Submissions
          </Button>
        </Box>

        {/* Header with Status */}
            <Box sx={{display: 'flex', alignItems: 'center', px: 4, gap: 1, mt: 3}}>

                <CompHeading 
                    title={normalizeStatus(latestSubmission?.status)}
                    variant="h5"
                    sx={{
                    fontWeight: 600,
                    color: getStatusColor(latestSubmission?.status),
                    }}
                />

                <CompHeading 
                    title={`${Math.max(progress?.passed, 0)} / ${progress?.total} testcases executed`}
                    sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}  
                />

            </Box>

          {/* Failed Test Case Details (if any) */}
          {!isAccepted && failedTests?.length > 0 && (
            <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
                {IOSectionStyles.map((section, idx) => (
                    <IOSection 
                        key={idx}
                        sectionHeading={section?.sectionHeading}
                        sectionData={section?.sectionData}
                        sx={section?.sx}
                        blockSx={section?.blockSx}
                    />
                ))}
            </Box>
          )}

        
          {/* Metrics Cards - Side by Side */}
          <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: 'flex', flexDirection: 'column', gap: 2 }}>
            
            {metricCardData.map((row, idx) => (
                <Stack key={idx} direction="row" spacing={2}>
                    
                    {row.map((card, rowIdx) => (
                        <MetricCard 
                            key={rowIdx}
                            icon={card?.icon}
                            title={card?.title}
                            data={card?.data}
                        />
                    ))}

                </Stack>
            ))}

          </Box>


            <CodeBlock 
                language={latestSubmission?.language_name}
                code={latestSubmission?.code}
                copied={copied}
                handleCopy={handleCopy}
            />
      </Box>
    );
  };



export default DetailedResult;