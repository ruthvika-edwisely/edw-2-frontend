import React, { useState, useMemo, useEffect } from "react";
import {
  Button,
  Stack,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Paper,
  Tooltip,
  Typography,
  Chip,
  LinearProgress,
  Collapse,
  Alert,
  Skeleton,
  Divider,
  Card,
} from "@mui/material";
import {
  X,
  Copy,
  Check,
  Clock,
  Database,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { updateSubmissionsData } from "../../../../store/features/problem/problemSlice";
import { getLatestSubmissionData } from "../../../../store/features/submission/submissionSlice";
import { getSubmissionById } from "../../../../api/api";

const Submissions = () => {
  const submissions = useSelector((state) => state.problem.submissions);
  const latestSubmissionData = useSelector((state) => state.submissions.currSubData);

  const dispatch = useDispatch();

  const theme = useTheme();
  const palette = theme.palette.problemPage;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmissionData, setSelectedSubmissionData] = useState(null);
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);
  const [showLatestCode, setShowLatestCode] = useState(false);

  console.log("this is selected submission : ", selectedSubmissionData);
  
  // New state for controlling the view
  const [showDetailedResult, setShowDetailedResult] = useState(false);

  // Transform currSubData to detailed submission format
  const latestSubmission = useMemo(() => {
    if (!latestSubmissionData) return null;

    return {
      id: latestSubmissionData.submission_id,
      status: latestSubmissionData.submission_status,

      totalExecTime:
        latestSubmissionData.avg_time ??
        latestSubmissionData.total_time ??
        0,

      maxExecTime: latestSubmissionData.max_time ?? 0,

      totalExecMemory:
        latestSubmissionData.avg_memory ??
        latestSubmissionData.total_memory ??
        0,

      maxExecMemory: latestSubmissionData.max_memory ?? 0,

      executed_testcase_count:
        latestSubmissionData.executed_testcase_count ?? 0,

      testcase_count:
        latestSubmissionData.testcase_count ?? 0,

      total_testcases_count:
        latestSubmissionData.total_testcases_count ?? 0,

      testcase_results:
        latestSubmissionData.testcase_results ?? [],

      time_complexity: latestSubmissionData.time_complexity,
      space_complexity: latestSubmissionData.space_complexity,

      mode: latestSubmissionData.mode,

      created_at: new Date().toISOString(),
      language_name: latestSubmissionData.language_name || "Unknown",
      code: latestSubmissionData.code || null,
    };
  }, [latestSubmissionData]);

  // Automatically show detailed result when new submission comes in
useEffect(() => {
  if (latestSubmission?.id) {
    setShowTestCases(false);
    setShowLatestCode(false);

    console.log('latest submission: ', latestSubmission);

    // Only show detailed result for Submit mode, not Run mode
    if (latestSubmission?.mode === "Submit") {
      setShowDetailedResult(true);
    } else {
      setShowDetailedResult(false);
      // Optionally add the submission to the list immediately for Run mode
      const totalSubmissions = structuredClone(submissions);
      totalSubmissions.push(latestSubmission);
      dispatch(updateSubmissionsData(totalSubmissions));
      dispatch(getLatestSubmissionData(null));
    }
  }
}, [latestSubmission?.id, latestSubmission?.mode]); // Added mode to dependencies

  // Sort submissions descending by created_at
  const sortedSubs = useMemo(() => {
    return [...submissions].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [submissions]);

  // Filter out the latest submission from the regular list if it exists in both
  const regularSubmissions = useMemo(() => {
    if (!latestSubmission?.id) return sortedSubs;
    return sortedSubs.filter((sub) => sub.id !== latestSubmission.id);
  }, [sortedSubs, latestSubmission]);

  const handleViewCode = async(submission) => {
    // Open dialog immediately
    setOpenDialog(true);
    setIsLoadingSubmission(true);
    setSelectedSubmissionData(null);
    
    try {
      const data = await getSubmissionById(submission?.id);
      setSelectedSubmissionData(data);
    } catch (error) {
      console.error("Error fetching submission:", error);
      // Optionally handle error state
    } finally {
      setIsLoadingSubmission(false);
    }
  };

  const handleCopy = (code) => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBackToSubmissions = () => {

    const totalSubmissions = structuredClone(submissions);
    totalSubmissions.push(latestSubmission);

    setShowDetailedResult(false);
    dispatch(updateSubmissionsData(totalSubmissions));
    dispatch(getLatestSubmissionData(null));
  };

  const normalizeStatus = (status) => {
    if (!status) return "Unknown";
    if (status === "AC" || status === "Accepted") return "Accepted";
    return status;
  };

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === "Accepted") {
      return "#22c55e";
    }
    return "#ef4444";
  };

  const getStatusIcon = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === "Accepted") {
      return <CheckCircle2 size={24} color="#22c55e" />;
    }
    return <XCircle size={24} color="#ef4444" />;
  };

  const getLanguageDisplay = (languageName) => {
    if (!languageName) return "Unknown";
    return languageName.charAt(0).toUpperCase() + languageName.slice(1);
  };

  // Helper function to get relative time or date
  const getRelativeTimeOrDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = diffInMs / (1000 * 60 * 60);

    // If less than 24 hours, show relative time
    if (diffInHours < 24) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      const diffInSeconds = Math.floor(diffInMs / 1000);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} sec${diffInSeconds !== 1 ? 's' : ''} ago`;
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} min${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else {
        const hours = Math.floor(diffInMinutes / 60);
        return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
      }
    }

    // If more than 24 hours, show date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Helper function to format date and time for dialog
  const getDateTimeDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTestCaseProgress = (submission) => {
    const passed = submission.executed_testcase_count || 0;
    const total = submission.total_testcases_count || 0;
    return { passed, total, percentage: total > 0 ? (passed / total) * 100 : 0 };
  };

  const getFailedTestCases = (testcaseResults) => {
    if (!testcaseResults || testcaseResults.length === 0) return [];
    return testcaseResults
      .map((result, index) => ({
        ...result,
        testCaseNumber: index + 1,
      }))
      .filter((result) => result.status !== "Accepted" && result.status !== "AC");
  };

  // Helper function to format output value
  const formatOutput = (value) => {
    if (value === null || value === undefined || value === "") {
      return "None";
    }
    return String(value);
  };

  // Skeleton loader for dialog content
  const renderDialogSkeleton = () => {
    return (
      <DialogContent sx={{ p: 0, backgroundColor: palette.cardBg }}>
        {/* Header Skeleton */}
        <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Skeleton variant="text" width={120} height={32} />
            <Skeleton variant="text" width={150} height={24} />
          </Stack>
        </Box>

        {/* Metrics Cards Skeleton */}
        <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px" }} />
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px" }} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px" }} />
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px" }} />
          </Stack>
        </Box>

        {/* Code Block Skeleton */}
        <Box sx={{ px: 4, py: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Skeleton variant="text" width={60} height={28} />
            <Skeleton variant="circular" width={32} height={32} />
          </Stack>

          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: `1px solid ${palette.codeBlockBorder}`,
              backgroundColor: palette.codeBg,
              p: 3,
            }}
          >
            <Stack spacing={1.5}>
              <Skeleton variant="text" width="90%" height={20} />
              <Skeleton variant="text" width="75%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="text" width="70%" height={20} />
              <Skeleton variant="text" width="88%" height={20} />
              <Skeleton variant="text" width="92%" height={20} />
              <Skeleton variant="text" width="78%" height={20} />
              <Skeleton variant="text" width="85%" height={20} />
              <Skeleton variant="text" width="65%" height={20} />
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    );
  };

  // Detailed Submission Result View (LeetCode style)
  const renderDetailedSubmissionResult = () => {
    if (!latestSubmission) return null;

    const progress = getTestCaseProgress(latestSubmission);
    const failedTests = getFailedTestCases(latestSubmission.testcase_results);
    const isAccepted = normalizeStatus(latestSubmission.status) === "Accepted";

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
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: getStatusColor(latestSubmission.status),
                }}
              >
                {normalizeStatus(latestSubmission.status)}
              </Typography>
              <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                {Math.max(progress.passed, 0)} / {progress.total} testcases executed
              </Typography>
            </Box>

          {/* Failed Test Case Details (if any) */}
          {!isAccepted && failedTests.length > 0 && (
            <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
              <Typography
                sx={{
                  color: palette.textPrimary,
                  fontSize: "0.938rem",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Input
              </Typography>
              <Box
                sx={{
                  backgroundColor: palette.exampleBg,
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  color: palette.textPrimary,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {formatOutput(failedTests[0].input)}
              </Box>

              <Typography
                sx={{
                  color: palette.textPrimary,
                  fontSize: "0.938rem",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Output
              </Typography>
              <Box
                sx={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderRadius: "8px",
                  p: 2,
                  mb: 2,
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  color: "#ef4444",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {formatOutput(failedTests[0].output)}
              </Box>

              <Typography
                sx={{
                  color: palette.textPrimary,
                  fontSize: "0.938rem",
                  fontWeight: 500,
                  mb: 2,
                }}
              >
                Expected
              </Typography>
              <Box
                sx={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  borderRadius: "8px",
                  p: 2,
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  color: "#22c55e",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {formatOutput(failedTests[0].expected_output)}
              </Box>

              {failedTests[0].stderr && (
                <>
                  <Typography
                    sx={{
                      color: palette.textPrimary,
                      fontSize: "0.938rem",
                      fontWeight: 500,
                      mb: 2,
                      mt: 2,
                    }}
                  >
                    Error Message
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: palette.exampleBg,
                      borderRadius: "8px",
                      p: 2,
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                      color: "#ef4444",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {failedTests[0].stderr}
                  </Box>
                </>
              )}
            </Box>
          )}

          {/* Metrics Cards - Side by Side */}
          <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Stack direction="row" spacing={2}>
              {/* Runtime Card */}
              <Card
                sx={{
                  flex: 1,
                  backgroundColor: palette.exampleBg,
                  border: `1px solid ${palette.cardBorder}`,
                  borderRadius: "12px",
                  p: 2.5,
                }}
                elevation={0}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Clock size={18} color={palette.textTertiary} />
                    <Typography
                      sx={{
                        color: palette.textTertiary,
                        fontSize: "0.813rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Runtime
                    </Typography>
                  </Stack>
                  <Typography 
                    sx={{ 
                      color: palette.textPrimary, 
                      fontSize: "1.5rem", 
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {latestSubmission.totalExecTime 
                      ? `${Math.round(latestSubmission.totalExecTime)} ms`
                      : "N/A"}
                  </Typography>
                </Stack>
              </Card>

              {/* Memory Card */}
              <Card
                sx={{
                  flex: 1,
                  backgroundColor: palette.exampleBg,
                  border: `1px solid ${palette.cardBorder}`,
                  borderRadius: "12px",
                  p: 2.5,
                }}
                elevation={0}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Database size={18} color={palette.textTertiary} />
                    <Typography
                      sx={{
                        color: palette.textTertiary,
                        fontSize: "0.813rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Memory
                    </Typography>
                  </Stack>
                  <Typography 
                    sx={{ 
                      color: palette.textPrimary, 
                      fontSize: "1.5rem", 
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {latestSubmission.totalExecMemory 
                      ? `${latestSubmission.totalExecMemory.toFixed(2)} MB`
                      : "N/A"}
                  </Typography>
                </Stack>
              </Card>

            </Stack>
            <Stack direction="row" spacing={2}>
              {/* Runtime Card */}
              <Card
                sx={{
                  flex: 1,
                  backgroundColor: palette.exampleBg,
                  border: `1px solid ${palette.cardBorder}`,
                  borderRadius: "12px",
                  p: 2.5,
                }}
                elevation={0}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Clock size={18} color={palette.textTertiary} />
                    <Typography
                      sx={{
                        color: palette.textTertiary,
                        fontSize: "0.813rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Time complexity
                    </Typography>
                  </Stack>
                  <Typography 
                    sx={{ 
                      color: palette.textPrimary, 
                      fontSize: "1.5rem", 
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {latestSubmission.time_complexity 
                      ? `${latestSubmission.time_complexity}`
                      : "N/A"}
                  </Typography>
                </Stack>
              </Card>

              <Card
                sx={{
                  flex: 1,
                  backgroundColor: palette.exampleBg,
                  border: `1px solid ${palette.cardBorder}`,
                  borderRadius: "12px",
                  p: 2.5,
                }}
                elevation={0}
              >
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Clock size={18} color={palette.textTertiary} />
                    <Typography
                      sx={{
                        color: palette.textTertiary,
                        fontSize: "0.813rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Space complexity
                    </Typography>
                  </Stack>
                  <Typography 
                    sx={{ 
                      color: palette.textPrimary, 
                      fontSize: "1.5rem", 
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    {latestSubmission.space_complexity 
                      ? `${latestSubmission.space_complexity}`
                      : "N/A"}
                  </Typography>
                </Stack>
              </Card>

            </Stack>
            
          </Box>

          {/* Code Section */}
          <Box sx={{ px: 4, py: 3 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography
                  sx={{
                    color: palette.textPrimary,
                    fontSize: "0.938rem",
                    fontWeight: 600,
                  }}
                >
                  Code
                </Typography>
                <Chip
                  label={getLanguageDisplay(latestSubmission.language_name)}
                  size="small"
                  sx={{
                    height: "24px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    backgroundColor: palette.exampleBg,
                    color: palette.textPrimary,
                  }}
                />
              </Stack>

              <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
                <IconButton
                  size="small"
                  onClick={() => handleCopy(latestSubmission.code)}
                  sx={{
                    color: palette.textTertiary,
                    "&:hover": {
                      backgroundColor: palette.exampleBg,
                    },
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </IconButton>
              </Tooltip>
            </Stack>

            {latestSubmission.code && (
              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${palette.codeBlockBorder}`,
                }}
              >
                <SyntaxHighlighter
                  language={latestSubmission.language_name?.toLowerCase() || "text"}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: "24px",
                    fontSize: "0.938rem",
                    lineHeight: 1.7,
                  }}
                  showLineNumbers
                  lineNumberStyle={{
                    minWidth: "3em",
                    paddingRight: "1.5em",
                    color: palette.textTertiary,
                    opacity: 0.4,
                  }}
                >
                  {latestSubmission.code}
                </SyntaxHighlighter>
              </Box>
            )}
          </Box>
      </Box>
    );
  };

  const renderSubmissionRow = (sub, index) => {
    return (
      <Box
        key={sub.id}
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
          alignItems: "center",
          gap: 3,
          px: 5,
          py: 3,
          borderBottom: index < regularSubmissions.length - 1 ? `1px solid ${palette.cardBorder}` : "none",
          transition: "all 0.2s ease",
          "&:hover": { backgroundColor: palette.exampleBg },
          cursor: "pointer",
        }}
        onClick={() => handleViewCode(sub)}
      >
        {/* Status and Date Column */}
        <Stack spacing={0.5}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.938rem",
              color: getStatusColor(sub.status),
            }}
          >
            {normalizeStatus(sub.status)}
          </Typography>
          <Typography sx={{ color: palette.textTertiary, fontSize: "0.813rem" }}>
            {getRelativeTimeOrDate(sub.created_at)}
          </Typography>
        </Stack>

        {/* Language */}
        <Typography sx={{ color: palette.textPrimary, fontSize: "0.938rem" }}>
          {getLanguageDisplay(sub.language_name)}
        </Typography>

        {/* Execution Time */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Clock size={16} color={palette.textTertiary} />
          <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
            {sub.totalExecTime ? `${Math.round(sub.totalExecTime)} ms` : "N/A"}
          </Typography>
        </Stack>

        {/* Memory */}
        <Stack direction="row" spacing={1} alignItems="center">
          <Database size={16} color={palette.textTertiary} />
          <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
            {sub.totalExecMemory ? `${sub.totalExecMemory.toFixed(2)} MB` : "N/A"}
          </Typography>
        </Stack>

        {/* View Code Button */}
        <Button
          variant="outlined"
          onClick={(e) => {
            e.stopPropagation();
            handleViewCode(sub);
          }}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.875rem",
            px: 3,
            py: 1,
            borderRadius: "8px",
            borderColor: palette.selectBorder,
            color: palette.textPrimary,
            whiteSpace: "nowrap",
            "&:hover": {
              borderColor: palette.tabIndicator,
              backgroundColor: palette.selectHover,
            },
          }}
        >
          View Code
        </Button>
      </Box>
    );
  };

  // Regular Submissions List View
  const renderSubmissionsList = () => {
    return (
      <Box sx={{ maxWidth: "900px", mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: palette.cardBg,
            border: `1px solid ${palette.cardBorder}`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box sx={{ px: 5, py: 4, borderBottom: `1px solid ${palette.cardBorder}` }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: palette.textPrimary }}>
              Submissions
            </Typography>
          </Box>

          {/* Submissions List */}
          <Stack spacing={0}>
            {regularSubmissions.map((sub, index) => renderSubmissionRow(sub, index))}

            {regularSubmissions.length === 0 && (
              <Box sx={{ px: 5, py: 8, textAlign: "center" }}>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.938rem" }}>
                  No submissions yet
                </Typography>
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>
    );
  };

  return (
    <>
      {/* Main Content - Toggle between detailed result and list view */}
      {showDetailedResult && latestSubmission?.id
        ? renderDetailedSubmissionResult()  
        : renderSubmissionsList()}

      {/* Code Dialog for Regular Submissions */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: palette.cardBg,
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 3,
            borderBottom: `1px solid ${palette.cardBorder}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: palette.cardBg,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, color: palette.textPrimary }}>
            Submission Details
          </Typography>
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{ color: palette.textSecondary }}
          >
            <X size={20} />
          </IconButton>
        </Box>

        {/* Show skeleton while loading, otherwise show actual content */}
        {isLoadingSubmission ? (
          renderDialogSkeleton()
        ) : selectedSubmissionData ? (
          <DialogContent sx={{ p: 0, backgroundColor: palette.cardBg }}>
            {/* Header with Status and Test Cases */}
            <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "1.125rem",
                    color: getStatusColor(selectedSubmissionData.status),
                  }}
                >
                  {normalizeStatus(selectedSubmissionData.status)}
                </Typography>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                  {Math.max(selectedSubmissionData.testcases_executed, 0) || 0} / {selectedSubmissionData.total_testcases || 0} testcases executed
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                  {getDateTimeDisplay(selectedSubmissionData.created_at)}
                </Typography>

                <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                  Mode : {selectedSubmissionData.mode}
                </Typography>
                
              </Stack>
            </Box>

            {/* Metrics Cards - Side by Side */}
            <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Stack direction="row" spacing={2}>
                {/* Runtime Card */}
                <Card
                  sx={{
                    flex: 1,
                    backgroundColor: palette.exampleBg,
                    border: `1px solid ${palette.cardBorder}`,
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                  elevation={0}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={18} color={palette.textTertiary} />
                      <Typography
                        sx={{
                          color: palette.textTertiary,
                          fontSize: "0.813rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Runtime
                      </Typography>
                    </Stack>
                    <Typography 
                      sx={{ 
                        color: palette.textPrimary, 
                        fontSize: "1.5rem", 
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {selectedSubmissionData.total_exec_time 
                        ? `${Math.round(selectedSubmissionData.total_exec_time)} ms`
                        : "N/A"}
                    </Typography>
                  </Stack>
                </Card>

                {/* Memory Card */}
                <Card
                  sx={{
                    flex: 1,
                    backgroundColor: palette.exampleBg,
                    border: `1px solid ${palette.cardBorder}`,
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                  elevation={0}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Database size={18} color={palette.textTertiary} />
                      <Typography
                        sx={{
                          color: palette.textTertiary,
                          fontSize: "0.813rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Memory
                      </Typography>
                    </Stack>
                    <Typography 
                      sx={{ 
                        color: palette.textPrimary, 
                        fontSize: "1.5rem", 
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {selectedSubmissionData.total_exec_memory 
                        ? `${selectedSubmissionData.total_exec_memory.toFixed(2)} MB`
                        : "N/A"}
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
              <Stack direction="row" spacing={2}>
                {/* Runtime Card */}
                <Card
                  sx={{
                    flex: 1,
                    backgroundColor: palette.exampleBg,
                    border: `1px solid ${palette.cardBorder}`,
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                  elevation={0}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* <Clock size={18} color={palette.textTertiary} /> */}
                      <Typography
                        sx={{
                          color: palette.textTertiary,
                          fontSize: "0.813rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Time Complexity
                      </Typography>
                    </Stack>
                    <Typography 
                      sx={{ 
                        color: palette.textPrimary, 
                        fontSize: "1.5rem", 
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {selectedSubmissionData.time_complexity 
                        ? `${selectedSubmissionData.time_complexity}`
                        : "N/A"}
                    </Typography>
                  </Stack>
                </Card>

                {/* Memory Card */}
                <Card
                  sx={{
                    flex: 1,
                    backgroundColor: palette.exampleBg,
                    border: `1px solid ${palette.cardBorder}`,
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                  elevation={0}
                >
                  <Stack spacing={1.5}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* <Database size={18} color={palette.textTertiary} /> */}
                      <Typography
                        sx={{
                          color: palette.textTertiary,
                          fontSize: "0.813rem",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Space Complexity
                      </Typography>
                    </Stack>
                    <Typography 
                      sx={{ 
                        color: palette.textPrimary, 
                        fontSize: "1.5rem", 
                        fontWeight: 700,
                        lineHeight: 1,
                      }}
                    >
                      {selectedSubmissionData.space_complexity 
                        ? `${selectedSubmissionData.space_complexity}`
                        : "N/A"}
                    </Typography>
                  </Stack>
                </Card>
              </Stack>
            </Box>

            {/* Code Block */}
            <Box sx={{ px: 4, py: 3 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 700, color: palette.textPrimary }}>
                    Code                  
                  </Typography>
                  <Typography sx={{ color: palette.textPrimary, fontSize: "0.875rem" }}>
                    {getLanguageDisplay(selectedSubmissionData.language_name)}
                  </Typography>
                </Box>

                <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(selectedSubmissionData.code)}
                    sx={{ color: palette.textTertiary }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </IconButton>
                </Tooltip>
              </Stack>

              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${palette.codeBlockBorder}`,
                }}
              >
                <SyntaxHighlighter
                  language={selectedSubmissionData.language_name?.toLowerCase() || "text"}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: "24px",
                    fontSize: "0.938rem",
                    lineHeight: 1.7,
                  }}
                  showLineNumbers
                  lineNumberStyle={{
                    minWidth: "3em",
                    paddingRight: "1.5em",
                    color: palette.textTertiary,
                    opacity: 0.4,
                  }}
                >
                  {selectedSubmissionData.code || "// No code available"}
                </SyntaxHighlighter>
              </Box>
            </Box>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
};

export default Submissions;