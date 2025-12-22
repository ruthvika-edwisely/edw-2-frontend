import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import EditorialHeader from "../../components/editorial/EditorialHeader.jsx";
import EditorialLock from "../../components/editorial/EditorialLock.jsx";
import EditorialOverview from "../../components/editorial/EditorialOverview.jsx";
import TabsComp from "../../components/TabsComp.jsx";
import DropdownList from "../../../../components/dropdowns/DropdownList.jsx";
import CodeBlock from "../../components/CodeBlock.jsx";
import EditorialVideo from "../../components/editorial/EditorialVideo.jsx";
import { copy } from "../../utils/copy.js";
import CompHeading from "../../components/CompHeading.jsx";

const Editorial = () => {
  const editorial = useSelector((state) => state.problem.editorial);
  const theme = useTheme();
  const palette = theme.palette.problemPage;
  const submissions = useSelector(state => state.problem.submissions);

  const [approachIndex, setApproachIndex] = useState(0);
  const [language, setLanguage] = useState("python");
  const [copied, setCopied] = useState(false);
  const [locked, setLocked] = useState(true);

  const approach = editorial.content.approaches[approachIndex];
  const languages = Object.keys(approach.code);


  const approachTabs = editorial?.content?.approaches?.map((a, idx) => {
    return {
      key: idx,
      label: a?.title || ""
    }
  });

  const options = languages.map((lang) => {
    return {
      value: lang,
      label: lang.charAt(0).toUpperCase() + lang.slice(1)
    }
  });

  const handleCopy = () => {
    copy(approach?.code[language]?.trim());
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

        <EditorialHeader title={editorial?.content?.title} />
        <EditorialLock locked={locked} />

        <Box
          sx={{
            filter: locked ? "blur(8px)" : "none",
            pointerEvents: locked ? "none" : "auto",
            userSelect: locked ? "none" : "auto",
          }}
        >
          {/* Overview */}
          <EditorialOverview overview={editorial?.content?.overview?.trim()} />

          {/* Approaches */}
          <Box sx={{ borderBottom: `1px solid ${palette.cardBorder}` }}>
            <Box
              sx={{
                px: { xs: 3, sm: 5 },
                pt: { xs: 3, sm: 4 },
                pb: 2,
              }}
            >

              <CompHeading 
                title={"Solution Approaches"}
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: palette.textPrimary,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.02em",
                }}
              />
            </Box>

            
            <TabsComp 
              value={approachIndex}
              onChange={(v) => {
                setApproachIndex(v);
                setLanguage("python");
              }}
              scrollButtons={false}
              tabs={approachTabs}
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
            />

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
                <Markdown>{approach?.explanation}</Markdown>
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

              <CompHeading 
                title={"Implementation"}
                variant="h6"
                sx={{
                  mb: 0,
                  fontWeight: 700,
                  color: palette.textPrimary,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.02em",
                }}
              />

              <DropdownList 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                size="small"
                options={options}
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
              />
            </Stack>

            <CodeBlock 
              language={language}
              copied={copied}
              handleCopy={handleCopy}
              code={approach?.code[language]?.trim()}
            />
          </Box>

          {/* Video */}
          {editorial?.videoUrl && (
            <EditorialVideo 
              title={"Video Explanation"}
              videoUrl={editorial?.videoUrl}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Editorial;