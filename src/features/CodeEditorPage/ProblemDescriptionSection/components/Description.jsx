import React, { useRef } from "react";
import {
  Chip,
  Paper,
  Stack,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Bolt as BoltIcon } from "@mui/icons-material";
import ExampleBlock from "../../components/ExampleBlock.jsx";
import ConstraintsSection from "../../components/description/ConstraintsSection.jsx";
import HintsSection from "../../components/description/HintsSection.jsx";
import TagsSection from "../../components/description/TagsSection.jsx";
import CompHeading from "../../components/CompHeading.jsx";

const Description = () => {
  const theme = useTheme();
  const palette = theme.palette.problemPage;

  /* ---------------- Redux Data (Safe Defaults) ---------------- */
  const problem = useSelector((state) => state.problem.data) || {};
  const tagsData = useSelector((state) => state.problem.tags) || [];
  const constraintsData = useSelector((state) => state.problem.constraints) || [];
  const hintsData = useSelector((state) => state.problem.hints) || [];
  const testcasesData = useSelector((state) => state.problem.testcases) || [];

  const {
    id,
    title,
    difficulty = "Easy",
    description = "",
    xp_reward = 0,
  } = problem;

  /* ---------------- Difficulty Styles ---------------- */
  const difficultyStyles = {
    Easy: { color: palette.diffEasy, bg: palette.diffEasyBg },
    Medium: { color: palette.diffMedium, bg: palette.diffMediumBg },
    Hard: { color: palette.diffHard, bg: palette.diffHardBg },
  };

  const currentDifficultyStyle =
    difficultyStyles[difficulty] || difficultyStyles.Easy;




  const topicsRef = useRef(null);
  const companiesRef = useRef(null);
  
  const scrollToTopics = () => {
    topicsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const scrollToCompanies = () => {
    companiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tagSectionData = [
    {
      "name": "Topics",
      "category": "Topic",
      "sx": {
              background: palette.topicChipBg,
              color: palette.topicChipText,
              border: `1px solid ${palette.topicChipBorder}`,
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.813rem",
              height: "26px",
              transition: "all 0.2s ease",
              "&:hover": {
                  background: palette.chipHoverBg,
                  transform: "translateY(-1px)",
              },
            },
      "ref": topicsRef,
      "fn": scrollToTopics
    },
    
    {
      "name": "Companies",
      "category": "Company",
      "sx": {
              background: palette.companyChipBg,
              color: palette.companyChipText,
              border: `1px solid ${palette.companyChipBorder}`,
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.813rem",
              height: "26px",
              transition: "all 0.2s ease",
              "&:hover": {
                background: palette.chipHoverBg,
                transform: "translateY(-1px)",
              },
            },
      "ref": companiesRef,
      "fn": scrollToCompanies
    }
  ];


  console.log("desc : ", description.split('\n'));




  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 2.5,
        backgroundColor: palette.cardBg,
        border: `1px solid ${palette.cardBorder}`,
        width: "100%",
      }}
    >
      {/* ---------------- Title ---------------- */}
      <Stack spacing={2} sx={{ mb: 3 }}>


        <CompHeading 
          title={`${id}. ${title}`}
          variant="h4"
          sx={{
            fontWeight: 700,
            color: palette.textPrimary,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        />

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            label={difficulty}
            sx={{
              backgroundColor: currentDifficultyStyle.bg,
              color: currentDifficultyStyle.color,
              fontWeight: 600,
              height: 28,
            }}
          />

          <Chip
            icon={<BoltIcon />}
            label={`${xp_reward} XP`}
            sx={{
              backgroundColor:  theme.palette.problemPage.xpBg,
              border: `1px solid ${theme.palette.xp.primary}`,
              color: theme.palette.xp.primary,
              fontWeight: 600,
              height: "28px",
              borderRadius: "8px",
              ml: 1,
              "& .MuiChip-icon": {
                color: theme.palette.xp.primary,
              },
            }}
          />



         {tagSectionData.map((chip, idx) => (
            <Chip
              key={idx}
              label={chip.name}
              size="small"
              onClick={chip.fn}
              sx={{
                background: palette.topicChipBg,
                color: palette.topicChipText,
                border: `1px solid ${palette.topicChipBorder}`,
                cursor: "pointer",
              }}
            />
          ))}
        </Stack>
      </Stack>




      {/* ------------------------------- DESCRIPTION ------------------------------- */}
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          lineHeight: 1.8,
          fontSize: "0.938rem",
          color: palette.textSecondary,
          mb: 3,
        }}
      >
        {description.split('\\n').map((d, idx) => <Box key={idx}>{d + "\n"}</Box>)}
      </Typography>


        {console.log(testcasesData)}



      {/* ------------------------------- EXAMPLES SECTION  ------------------------------- */}
      {testcasesData.filter(tc => !tc.isHidden).map((tc, idx) => 
        <ExampleBlock key={idx} tc={tc} idx={idx} />
      )}

      

      {/* ------------------------------- CONSTRAINTS ------------------------------- */}
      <ConstraintsSection data={constraintsData} />
      <Divider sx={{ mb: 3, borderColor: palette.divider }} />




      {/* ------------------------------- HINTS SECTION ------------------------------- */}
      <HintsSection data={hintsData} />
      <Divider sx={{ mb: 3, borderColor: palette.divider }} />




      {/* ---------------- Tags ---------------- */}
      <Stack spacing={3}>
        {/* Topics and Companies */}
        {tagSectionData.map((tag, idx) => (
          <TagsSection 
            key={idx}
            data={tagsData}
            category={tag.category}
            tagsRef={tag.ref}
            scrollToTags={tag.fn}
            sx={tag.sx}
          />
        ))}
      </Stack>

    </Paper>
  );
};

export default Description;
