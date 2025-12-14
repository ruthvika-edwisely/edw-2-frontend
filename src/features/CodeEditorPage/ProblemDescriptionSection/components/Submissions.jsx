import React, { useState, useMemo } from "react";
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
  Collapse,
} from "@mui/material";
import { X, Copy, Check, Clock, Database, ChevronDown, ChevronUp } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const Submissions = ({ currentSubmissionResult = null }) => {
  const submissions = useSelector((state) => state.problem.submissions);
  const latestSubmissionData = useSelector((state) => state.submissions.currSubData);

  console.log('latest : ', latestSubmissionData);

  const theme = useTheme();
  const palette = theme.palette.problemPage;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showTestCases, setShowTestCases] = useState(false);

  // Sort submissions descending by created_at
  const sortedSubs = useMemo(() => {
    return [...submissions].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [submissions]);

  const handleViewCode = (submission) => {
    setSelectedSubmission(submission);
    setOpenDialog(true);
  };

  const handleCopy = () => {
    if (selectedSubmission?.code) {
      navigator.clipboard.writeText(selectedSubmission.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const normalizeStatus = (status) => {
    if (!status) return "Unknown";
    if (status === "AC") return "Accepted";
    return status;
  };

  const getStatusColor = (status) => {
    const normalized = normalizeStatus(status);
    if (normalized === "Accepted") {
      return "#22c55e"; // green
    }
    return "#ef4444"; // red for everything else
  };

  const getLanguageDisplay = (languageName) => {
    if (!languageName) return "Unknown";
    return languageName.charAt(0).toUpperCase() + languageName.slice(1);
  };

  const getTestCaseStatusColor = (status) => {
    if (status === "Accepted") return "#22c55e";
    return "#ef4444";
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto" }}>
      {/* Current Submission Result */}
      {currentSubmissionResult && (
        <Paper
          elevation={0}
          sx={{
            backgroundColor: palette.cardBg,
            border: `2px solid ${getStatusColor(currentSubmissionResult.submission_status)}`,
            borderRadius: 2,
            overflow: "hidden",
            mb: 3,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              px: 4,
              py: 3,
              background: `linear-gradient(to right, ${getStatusColor(currentSubmissionResult.submission_status)}15, transparent)`,
              borderBottom: `1px solid ${palette.cardBorder}`,
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: getStatusColor(currentSubmissionResult.submission_status),
                }}
              >
                {normalizeStatus(currentSubmissionResult.submission_status)}
              </Typography>
              <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                Current Submission
              </Typography>
            </Stack>
          </Box>

          {/* Metrics Grid */}
          <Box sx={{ px: 4, py: 3 }}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 3,
              }}
            >
              {/* Test Cases */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Test Cases
                </Typography>
                <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                  {currentSubmissionResult.executed_testcase_count} / {currentSubmissionResult.testcase_count}
                </Typography>
              </Box>

              {/* Total Time */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Total Time
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                    {Math.round(currentSubmissionResult.total_time)}
                  </Typography>
                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>ms</Typography>
                </Stack>
              </Box>

              {/* Average Time */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Avg Time
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                    {currentSubmissionResult.avg_time.toFixed(2)}
                  </Typography>
                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>ms</Typography>
                </Stack>
              </Box>

              {/* Max Time */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Max Time
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                    {currentSubmissionResult.max_time.toFixed(2)}
                  </Typography>
                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>ms</Typography>
                </Stack>
              </Box>

              {/* Total Memory */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Total Memory
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                    {currentSubmissionResult.total_memory.toFixed(2)}
                  </Typography>
                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>MB</Typography>
                </Stack>
              </Box>

              {/* Average Memory */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Avg Memory
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                    {currentSubmissionResult.avg_memory.toFixed(2)}
                  </Typography>
                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>MB</Typography>
                </Stack>
              </Box>

              {/* Max Memory */}
              <Box>
                <Typography sx={{ color: palette.textTertiary, fontSize: "0.75rem", mb: 0.5 }}>
                  Max Memory
                </Typography>
                <Stack direction="row" spacing={0.5} alignItems="baseline">
                  <Typography sx={{ color: palette.textPrimary, fontWeight: 600, fontSize: "1rem" }}>
                    {currentSubmissionResult.max_memory.toFixed(2)}
                  </Typography>
                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>MB</Typography>
                </Stack>
              </Box>
            </Box>
          </Box>

          {/* Test Cases Details Toggle */}
          <Box sx={{ borderTop: `1px solid ${palette.cardBorder}` }}>
            <Button
              fullWidth
              onClick={() => setShowTestCases(!showTestCases)}
              sx={{
                py: 2,
                textTransform: "none",
                color: palette.textPrimary,
                justifyContent: "space-between",
                "&:hover": { backgroundColor: palette.exampleBg },
              }}
              endIcon={showTestCases ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            >
              <Typography sx={{ fontWeight: 600 }}>
                View Test Case Results ({currentSubmissionResult.testcase_results.length})
              </Typography>
            </Button>

            <Collapse in={showTestCases}>
              <Box sx={{ px: 4, pb: 3 }}>
                <Stack spacing={2}>
                  {currentSubmissionResult.testcase_results.map((testcase, idx) => (
                    <Paper
                      key={testcase.testcase_id}
                      elevation={0}
                      sx={{
                        p: 2,
                        backgroundColor: palette.exampleBg,
                        border: `1px solid ${palette.cardBorder}`,
                        borderRadius: 2,
                      }}
                    >
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography sx={{ fontWeight: 600, color: palette.textPrimary }}>
                            Test Case {idx + 1}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.875rem",
                              color: getTestCaseStatusColor(testcase.status),
                            }}
                          >
                            {testcase.status}
                          </Typography>
                        </Stack>

                        <Box
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(2, 1fr)",
                            gap: 2,
                          }}
                        >
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Clock size={14} color={palette.textTertiary} />
                            <Typography sx={{ color: palette.textTertiary, fontSize: "0.813rem" }}>
                              {testcase.time.toFixed(2)} ms
                            </Typography>
                          </Stack>

                          <Stack direction="row" spacing={1} alignItems="center">
                            <Database size={14} color={palette.textTertiary} />
                            <Typography sx={{ color: palette.textTertiary, fontSize: "0.813rem" }}>
                              {testcase.memory.toFixed(2)} MB
                            </Typography>
                          </Stack>
                        </Box>

                        {testcase.output && (
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              sx={{
                                color: palette.textTertiary,
                                fontSize: "0.75rem",
                                mb: 0.5,
                              }}
                            >
                              Output:
                            </Typography>
                            <Box
                              sx={{
                                p: 1.5,
                                backgroundColor: palette.cardBg,
                                borderRadius: 1,
                                border: `1px solid ${palette.cardBorder}`,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontFamily: "monospace",
                                  fontSize: "0.813rem",
                                  color: palette.textPrimary,
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                {testcase.output}
                              </Typography>
                            </Box>
                          </Box>
                        )}
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Box>
        </Paper>
      )}

      {/* Previous Submissions */}
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
          {sortedSubs.map((sub, index) => {
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
                  borderBottom:
                    index < sortedSubs.length - 1 ? `1px solid ${palette.cardBorder}` : "none",
                  transition: "background-color 0.2s ease",
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
                    {new Date(sub.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
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
          })}

          {submissions.length === 0 && (
            <Box sx={{ px: 5, py: 8, textAlign: "center" }}>
              <Typography sx={{ color: palette.textTertiary, fontSize: "0.938rem" }}>
                No submissions yet
              </Typography>
            </Box>
          )}
        </Stack>
      </Paper>

      {/* Code Dialog */}
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
        {selectedSubmission && (
          <>
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
              <IconButton onClick={() => setOpenDialog(false)} sx={{ color: palette.textSecondary }}>
                <X size={20} />
              </IconButton>
            </Box>

            <DialogContent sx={{ p: 0, backgroundColor: palette.cardBg }}>
              {/* Metrics */}
              <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
                <Stack direction="row" spacing={3} flexWrap="wrap" alignItems="center">
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: getStatusColor(selectedSubmission.status),
                    }}
                  >
                    {normalizeStatus(selectedSubmission.status)}
                  </Typography>

                  <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                    {new Date(selectedSubmission.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Clock size={16} />
                    <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                      {selectedSubmission.totalExecTime
                        ? `${Math.round(selectedSubmission.totalExecTime)} ms`
                        : "N/A"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Database size={16} />
                    <Typography sx={{ color: palette.textTertiary, fontSize: "0.875rem" }}>
                      {selectedSubmission.totalExecMemory
                        ? `${selectedSubmission.totalExecMemory.toFixed(2)} MB`
                        : "N/A"}
                    </Typography>
                  </Stack>

                  <Typography sx={{ color: palette.textPrimary, fontSize: "0.875rem" }}>
                    {getLanguageDisplay(selectedSubmission.language_name)}
                  </Typography>
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
                  <Typography variant="body1" sx={{ fontWeight: 700, color: palette.textPrimary }}>
                    Code
                  </Typography>

                  <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
                    <IconButton
                      size="small"
                      onClick={handleCopy}
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
                    language={selectedSubmission.language_name?.toLowerCase() || "text"}
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
                    {selectedSubmission.code || "// No code available"}
                  </SyntaxHighlighter>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Submissions;