import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  MenuItem,
  Select,
  FormControl,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Copy, Check, Play, Lock } from "lucide-react";

const Editorial = () => {
  const editorial = useSelector((state) => state.problem.editorial);
  const theme = useTheme();
  const palette = theme.palette.problemPage;
  const submissions = useSelector(state => state.problem.submissions);
  const subLength = submissions.length;

  const [approachIndex, setApproachIndex] = useState(0);
  const [language, setLanguage] = useState("python");
  const [copied, setCopied] = useState(false);
  const [locked, setLocked] = useState(true);

  const approach = editorial.content.approaches[approachIndex];
  const languages = Object.keys(approach.code);

  const handleCopy = () => {
    navigator.clipboard.writeText(approach.code[language].trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  console.log('subs: ', submissions);
  useEffect(() => {
    submissions.forEach((sub) => {
      console.log(sub.status, sub);
      if(sub.status == "AC" && sub.mode == "Submit") {
        setLocked(false);
      }
    });

  }, [submissions]);


  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: palette.cardBg,
          border: `1px solid ${palette.cardBorder}`,
          borderRadius: 3,
          overflow: "hidden",
          height: locked ? "100vh" : '100%'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: { xs: 3, sm: 5 },
            pt: { xs: 4, sm: 5 },
            pb: { xs: 3, sm: 4 },
            borderBottom: `1px solid ${palette.cardBorder}`,
          }}
        >
          <Stack spacing={1}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: palette.textPrimary,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}
            >
              {editorial.content.title}
            </Typography>

            <Chip
              icon={<Play size={10} />}
              label="EDITORIAL"
              sx={{
                width: "fit-content",
                backgroundColor: palette.editorialChipBg,
                color: palette.editorialChipText,
                border: `1px solid ${palette.editorialChipBorder}`,
                fontWeight: 700,
                fontSize: "0.5rem",
                letterSpacing: "0.08em",
                height: "24px",
                "& .MuiChip-icon": {
                  color: palette.editorialChipText,
                  marginLeft: "8px",
                  marginRight: "-4px",
                },
              }}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            p: locked ? 2 : 0
          }}
        >
          {/* Lock Message */}
          {locked && (
            <Box 
              sx={{
                position: "relative",
                px: { xs: 3, sm: 5 },
                py: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
                backgroundColor: palette.lockedBg || "rgba(255, 152, 0, 0.08)",
                border: `1px solid ${palette.lockedBorder || "rgba(255, 152, 0, 0.2)"}`,
                borderRadius: 3,
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  backgroundColor: palette.lockedIconBg || "rgba(255, 152, 0, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Lock 
                  size={24} 
                  color={palette.lockedIconColor || "#ff9800"}
                />
              </Box>
              
              <Typography
                variant="h6"
                sx={{
                  color: palette.textPrimary,
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "-0.01em",
                }}
              >
                Editorial Locked
              </Typography>
              
              <Typography
                sx={{
                  color: palette.textSecondary,
                  fontSize: "0.875rem",
                  maxWidth: "400px",
                  lineHeight: 1.6,
                }}
              >
                Editorial will unlock after your<strong style={{ color: palette.textPrimary, fontWeight: 600 }}> first correct submission</strong>
              </Typography>
            </Box>
          )}
        </Box>

        <Box
          sx={{
            filter: locked ? "blur(8px)" : "none",
            pointerEvents: locked ? "none" : "auto",
            userSelect: locked ? "none" : "auto",
          }}
        >
          {/* Overview */}
          <Box
            sx={{
              px: { xs: 3, sm: 5 },
              py: { xs: 3, sm: 4 },
              borderBottom: `1px solid ${palette.cardBorder}`,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: palette.textPrimary,
                mb: 2.5,
                fontSize: "1.125rem",
                letterSpacing: "-0.02em",
              }}
            >
              Overview
            </Typography>

            <Box
              sx={{
                color: palette.textSecondary,
                lineHeight: 1.75,
                fontSize: "1rem",
                mb: 1.5,
                "&:last-child": { mb: 0 },
              }}
            >
              <Markdown>{editorial.content.overview.trim()}</Markdown>
            </Box>
          </Box>

          {/* Approaches */}
          <Box sx={{ borderBottom: `1px solid ${palette.cardBorder}` }}>
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                pt: { xs: 3, sm: 4 },
                pb: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: palette.textPrimary,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Solution Approaches
              </Typography>
            </Box>

            <Tabs
              value={approachIndex}
              onChange={(e, v) => {
                setApproachIndex(v);
                setLanguage("python");
              }}
              variant="scrollable"
              scrollButtons={false}
              sx={{
                px: { xs: 3, sm: 5 },
                borderBottom: `2px solid ${palette.cardBorder}`,
                "& .MuiTabs-flexContainer": {
                  gap: 0.5,
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "0.938rem",
                  color: palette.textSecondary,
                  px: 0,
                  py: 2,
                  minWidth: "auto",
                  mr: 4,
                  minHeight: 0,
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: palette.textPrimary,
                  },
                },
                "& .Mui-selected": {
                  color: `${palette.tabSelected} !important`,
                  fontWeight: 700,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: palette.tabIndicator,
                  height: 3,
                  borderRadius: "3px 3px 0 0",
                },
              }}
            >
              {editorial?.content?.approaches.map((a, idx) => (
                <Tab
                  key={a.id}
                  label={`${a.title}`}
                />
              ))}
            </Tabs>

            {/* Explanation */}
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                py: { xs: 3, sm: 4 },
              }}
            >
              <Box
                sx={{
                  "& p": {
                    color: palette.textSecondary,
                    lineHeight: 1.75,
                    fontSize: "1rem",
                    mb: 2,
                    "&:last-child": { mb: 0 },
                  },
                  "& strong": {
                    color: palette.textPrimary,
                    fontWeight: 700,
                  },
                  "& code": {
                    backgroundColor: palette.codeBg,
                    color: palette.textPrimary,
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "0.875rem",
                    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                    fontWeight: 500,
                  },
                  "& h1, & h2, & h3": {
                    color: palette.textPrimary,
                    fontWeight: 700,
                    mt: 3,
                    mb: 2,
                    letterSpacing: "-0.02em",
                  },
                  "& h4": {
                    color: palette.textPrimary,
                    fontWeight: 700,
                    fontSize: "1rem",
                    mt: 2.5,
                    mb: 1.5,
                  },
                  "& ul, & ol": {
                    color: palette.textSecondary,
                    pl: 4,
                    mb: 2,
                  },
                  "& li": {
                    mb: 1,
                    lineHeight: 1.75,
                  },
                }}
              >
                <Markdown>{approach.explanation}</Markdown>
              </Box>
            </Box>
          </Box>

          {/* Implementation */}
          <Box
            sx={{
              px: { xs: 3, sm: 5 },
              py: { xs: 3, sm: 4 },
              borderBottom: editorial.videoUrl ? `1px solid ${palette.cardBorder}` : "none",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 2.5 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: palette.textPrimary,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Implementation
              </Typography>

              <FormControl>
                <Select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  size="small"
                  sx={{
                    backgroundColor: palette.selectBg,
                    color: palette.textPrimary,
                    borderRadius: "8px",
                    border: `1px solid ${palette.selectBorder}`,
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    minWidth: "140px",
                    "& .MuiSelect-select": {
                      py: 1,
                      px: 2,
                    },
                    "&:hover": {
                      backgroundColor: palette.selectHover,
                      borderColor: palette.tabIndicator,
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    "& .MuiSelect-icon": {
                      color: palette.textSecondary,
                    },
                  }}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Box
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                border: `1px solid ${palette.codeBlockBorder}`,
              }}
            >
              {/* Code Header */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: 3,
                  py: 1.5,
                  backgroundColor: palette.codeBlockBorder,
                  borderBottom: `1px solid ${palette.codeBlockBorder}`,
                }}
              >
                <Typography
                  sx={{
                    color: palette.textTertiary,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {language}
                </Typography>

                <Tooltip title={copied ? "Copied!" : "Copy code"} placement="left">
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{
                      color: palette.textTertiary,
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        color: palette.textPrimary,
                      },
                    }}
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Code */}
              <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "24px",
                  fontSize: "0.938rem",
                  borderRadius: 0,
                  lineHeight: 1.7,
                }}
                showLineNumbers
                lineNumberStyle={{
                  minWidth: "3em",
                  paddingRight: "1.5em",
                  opacity: 0.4,
                  userSelect: "none",
                }}
              >
                {approach.code[language].trim()}
              </SyntaxHighlighter>
            </Box>
          </Box>

          {/* Video */}
          {editorial.videoUrl && (
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                py: { xs: 3, sm: 4 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: palette.textPrimary,
                  mb: 2.5,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.02em",
                }}
              >
                Video Explanation
              </Typography>

              <Box
                sx={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: `1px solid ${palette.videoBorder}`,
                  backgroundColor: palette.videoPlaceholderBg,
                  aspectRatio: "16/9",
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={editorial.videoUrl.replace("watch?v=", "embed/")}
                  title="Video Explanation"
                  style={{ border: "none", display: "block" }}
                  allowFullScreen
                ></iframe>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Editorial;