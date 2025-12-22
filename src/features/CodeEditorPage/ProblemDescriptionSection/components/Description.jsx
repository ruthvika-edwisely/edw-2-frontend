import React, { useRef } from "react";
import {
  Chip,
  Paper,
  Stack,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Code2, Building2, Lightbulb } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Bolt as BoltIcon } from "@mui/icons-material";

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

  /* ---------------- Scroll Refs ---------------- */
  const topicsRef = useRef(null);
  const companiesRef = useRef(null);

  const chips = [
    { name: "Topics", fn: () => topicsRef.current?.scrollIntoView({ behavior: "smooth" }) },
    { name: "Companies", fn: () => companiesRef.current?.scrollIntoView({ behavior: "smooth" }) },
  ];

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
        <Typography variant="h4" sx={{ fontWeight: 700, color: palette.textPrimary }}>
          {id}. {title}
        </Typography>

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
              backgroundColor: palette.xpBg,
              border: `1px solid ${theme.palette.xp.primary}`,
              color: theme.palette.xp.primary,
              fontWeight: 600,
              height: 28,
            }}
          />

          {chips.map((chip, idx) => (
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

      {/* ---------------- Description ---------------- */}
      <Typography
        sx={{
          whiteSpace: "pre-wrap",
          lineHeight: 1.8,
          fontSize: "0.938rem",
          color: palette.textSecondary,
          mb: 3,
        }}
      >
        {description}
      </Typography>

      {/* ---------------- Examples ---------------- */}
      {testcasesData
        .filter((tc) => !tc?.isHidden)
        .map((tc, idx) => (
          <Box
            key={idx}
            sx={{
              background: palette.exampleBg,
              borderRadius: 2,
              p: 2.5,
              mb: 3,
              border: `1px solid ${palette.cardBorder}`,
              borderLeft: `3px solid ${palette.exampleBorder}`,
            }}
          >
            <Typography fontWeight={700} mb={2}>
              Example {tc?.order ?? idx + 1}
            </Typography>

            {/* Input */}
            <Box mb={1.5}>
              <Typography fontSize="0.75rem">Input:</Typography>
              <Box
                sx={{
                  fontFamily: "monospace",
                  background: palette.codeBg,
                  p: 1.5,
                  borderRadius: 1.5,
                }}
              >
                {(tc?.input_to_show ?? "")
                  .split("\n")
                  .map((line, i) => (
                    <Box key={i}>{line}</Box>
                  ))}
              </Box>
            </Box>

            {/* Output */}
            <Box mb={1.5}>
              <Typography fontSize="0.75rem">Output:</Typography>
              <Box
                sx={{
                  fontFamily: "monospace",
                  background: palette.codeBg,
                  p: 1.5,
                  borderRadius: 1.5,
                }}
              >
                {tc?.expected_output_to_show ?? ""}
              </Box>
            </Box>

            {/* Explanation */}
            {tc?.explanation && (
              <Box>
                <Typography fontSize="0.75rem">Explanation:</Typography>
                <Box
                  sx={{
                    fontFamily: "monospace",
                    background: palette.codeBg,
                    p: 1.5,
                    borderRadius: 1.5,
                  }}
                >
                  {tc.explanation}
                </Box>
              </Box>
            )}
          </Box>
        ))}

      {/* ---------------- Constraints ---------------- */}
      <Box mb={3}>
        <Typography fontWeight={700} mb={1.5}>
          Constraints:
        </Typography>

        <List dense>
          {constraintsData.map((item) => (
            <ListItem key={item.id} sx={{ p: 0 }}>
              <Typography>• {item.content}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* ---------------- Hints ---------------- */}
      {hintsData.length > 0 && (
        <Box mb={3}>
          <Stack direction="row" spacing={1} mb={2}>
            <Lightbulb size={18} />
            <Typography fontWeight={700}>Hints</Typography>
          </Stack>

          {hintsData.map((hint, index) => (
            <Accordion key={hint.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Hint {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography whiteSpace="pre-wrap">{hint.content}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      <Divider sx={{ mb: 3 }} />

      {/* ---------------- Tags ---------------- */}
      <Stack spacing={3}>
        <Box ref={topicsRef}>
          <Stack direction="row" spacing={1} mb={1.5}>
            <Code2 size={18} />
            <Typography fontWeight={700}>Topics</Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tagsData
              .filter((t) => t.category === "Topic")
              .map((tag) => (
                <Chip key={tag.id} label={tag.name} size="small" />
              ))}
          </Stack>
        </Box>

        <Box ref={companiesRef}>
          <Stack direction="row" spacing={1} mb={1.5}>
            <Building2 size={18} />
            <Typography fontWeight={700}>Companies</Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tagsData
              .filter((t) => t.category === "Company")
              .map((tag) => (
                <Chip key={tag.id} label={tag.name} size="small" />
              ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Description;
