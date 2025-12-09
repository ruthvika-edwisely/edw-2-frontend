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
} from "@mui/material";
import { getAllLanguages, getSubmissionAnswers } from "../../../../api/api.js";
import { X, Copy, Check, Clock, Database, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

const Submissions = () => {
  const submissions = useSelector((state) => state.submissions.currProbSubs);
  const theme = useTheme();
  const palette = theme.palette.problemPage;

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [copied, setCopied] = useState(false);

  const languages = getAllLanguages();

  // Sort submissions descending by createdAt
  const sortedSubs = useMemo(() => {
    return [...submissions].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [submissions]);

  const handleViewCode = (submission) => {
    const answer = getSubmissionAnswers(submission.id)[0];
    setSelectedAnswer(answer);
    setOpenDialog(true);
  };

  const handleCopy = () => {
    if (selectedAnswer) {
      navigator.clipboard.writeText(selectedAnswer.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getLanguageName = (languageId) => {
    return languages.find((l) => l.id === languageId)?.name || "text";
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "Accepted":
        return { color: palette.diffEasy, icon: CheckCircle2 };
      case "Wrong Answer":
        return { color: palette.diffHard, icon: XCircle };
      case "Runtime Error":
      case "Time Limit Exceeded":
        return { color: palette.diffHard, icon: AlertCircle };
      default:
        return { color: palette.textSecondary, icon: AlertCircle };
    }
  };

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto" }}>
      <Paper
        elevation={0}
        sx={{
          backgroundColor: palette.cardBg,
          border: `1px solid ${palette.cardBorder}`,
          // borderRadius: 3,
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
            const statusConfig = getStatusConfig(sub.status);

            const sub_data = getSubmissionAnswers(sub.id)[0];
            console.log(sub);

            return (
              <Box
                key={sub.id}
                sx={{
                  px: 5,
                  py: 2.5,
                  borderBottom: index < sortedSubs.length - 1 ? `1px solid ${palette.cardBorder}` : "none",
                  transition: "background-color 0.2s ease",
                  "&:hover": { backgroundColor: palette.exampleBg },
                  cursor: "pointer",
                  width: "100%"
                }}
                onClick={() => handleViewCode(sub)}
              >
                <Box sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr) auto", // six equal columns
                  alignItems: "center",
                  px: 5,
                  py: 2,
                  borderBottom: index < sortedSubs.length - 1 ? `1px solid ${palette.cardBorder}` : "none",
                  "&:hover": { backgroundColor: palette.exampleBg },
                  cursor: "pointer",
                  gap: 2,
                  width: "100%"
                }}>
                  <Stack sx={{display: "flex", flexDirection: "column", gap: 1}}>
                    {/* Status Text */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        color: statusConfig.color,
                      }}
                    >
                      {sub.status}
                    </Typography>

                    {/* Date only */}
                    <Typography sx={{ color: palette.textTertiary }}>
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </Typography>
                  </Stack>

                  
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography sx={{color: palette.textPrimary }}>
                      {languages.find((l) => l.id === sub_data.languageId)?.name || "Unknown"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={16} />
                      <Typography sx={{ color: palette.textTertiary }}>
                        {sub_data.totalExecTime}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Database size={16} />
                      <Typography sx={{ color: palette.textTertiary }}>{sub_data.totalExecMemory}</Typography>
                    </Stack>


                  {/* View Code Button */}
                  <Button
                    variant="outlined"
                    onClick={() => handleViewCode(sub)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      px: 3,
                      py: 1,
                      borderRadius: "8px",
                      borderColor: palette.selectBorder,
                      color: palette.textPrimary,
                      "&:hover": { borderColor: palette.tabIndicator, backgroundColor: palette.selectHover },
                      
                    }}
                  >
                    View Code
                  </Button>
                </Box>
              </Box>
            );
          })}

          {submissions.length === 0 && (
            <Box sx={{ px: 5, py: 6, textAlign: "center" }}>
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
          PaperProps={{ sx: { backgroundColor: palette.cardBg, borderRadius: 3, maxHeight: "90vh" } }}
        >
          {selectedAnswer && (
            <>
              <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", justifyContent: "space-between", backgroundColor: palette.cardBg }}>
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
                  <Stack direction="row" spacing={2} flexWrap="wrap" gap={1}>
                    <Stack direction="row" spacing={1} alignItems="center">

                      <Typography sx={{ fontWeight: 700, color: getStatusConfig(selectedAnswer.status).color }}>
                        {selectedAnswer.status}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{ color: palette.textTertiary }}>
                        {new Date(selectedAnswer.createdAt).toLocaleString()}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Clock size={16} />
                      <Typography sx={{ color: palette.textTertiary }}>
                        {selectedAnswer.totalExecTime}
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Database size={16} />
                      <Typography sx={{ color: palette.textTertiary }}>{selectedAnswer.totalExecMemory}</Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography sx={{color: palette.textPrimary }}>
                        {languages.find((l) => l.id === selectedAnswer.languageId)?.name || "Unknown"}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                {/* Code Block */}
                <Box sx={{ px: 4, py: 3 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: palette.textPrimary }}>
                      Code
                    </Typography>

                    <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
                      <IconButton size="small" onClick={handleCopy} sx={{ color: palette.textTertiary }}>
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </IconButton>
                    </Tooltip>
                  </Stack>

                  <Box sx={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${palette.codeBlockBorder}` }}>
                    <SyntaxHighlighter
                      language={getLanguageName(selectedAnswer.languageId)}
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: "24px", fontSize: "0.938rem", lineHeight: 1.7 }}
                      showLineNumbers
                      lineNumberStyle={{ minWidth: "3em", paddingRight: "1.5em", color: palette.textTertiary, opacity: 0.4 }}
                    >
                      {selectedAnswer.code}
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