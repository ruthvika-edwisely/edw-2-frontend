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
import { BadgeIndianRupee, Code2, Building2, Lightbulb } from "lucide-react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { Bolt as BoltIcon } from "@mui/icons-material";

const Description = () => {
  const theme = useTheme();
  const palette = theme.palette.problemPage;

  const problem = useSelector((state) => state.problem.data);
  const tagsData = useSelector((state) => state.problem.tags);
  const constraintsData = useSelector((state) => state.problem.constraints);
  const hintsData = useSelector((state) => state.problem.hints);
  const testcasesData = useSelector((state) => state.problem.testcases);

  const { id, title, difficulty, description, xp_reward } = problem || {};

  console.log(description.split("\\n"));

  const difficultyStyles = {
    Easy: {
      color: palette.diffEasy,
      bg: palette.diffEasyBg,
    },
    Medium: {
      color: palette.diffMedium,
      bg: palette.diffMediumBg,
    },
    Hard: {
      color: palette.diffHard,
      bg: palette.diffHardBg,
    },
  };

  const currentDifficultyStyle = difficultyStyles[difficulty] || difficultyStyles.Easy;


  const topicsRef = useRef(null);
  const companiesRef = useRef(null);
  
  const scrollToTopics = () => {
    topicsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const scrollToCompanies = () => {
    companiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  
  const chips = [{"name": "Topics", "fn": scrollToTopics}, {"name": "Companies", "fn": scrollToCompanies}]



  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        borderRadius: 2.5,
        backgroundColor: palette.cardBg,
        border: `1px solid ${palette.cardBorder}`,
        transition: "all 0.2s ease-in-out",
        width: "100%"
      }}
    >
      {/* ------------------------------- TITLE + METADATA ------------------------------- */}
      <Stack spacing={2} sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: palette.textPrimary,
            fontSize: { xs: "1.5rem", sm: "2rem" },
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
          }}
        >
          {id}. {title}
        </Typography>

        {/* Difficulty & XP Row */}
        <Stack 
          direction="row" 
          spacing={1.5} 
          alignItems="center"
          flexWrap="wrap"
          sx={{ gap: 1 }}
        >

          <Chip
            label={difficulty}  
            sx={{
              backgroundColor: currentDifficultyStyle.bg,
              color: currentDifficultyStyle.color,
              fontWeight: 600,
              borderRadius: "8px",
              height: "28px",
              px: 0.5,
              border: "none",
              fontSize: "0.813rem",
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



         {
          chips.map((chip, idx) => (
            <Chip
                key={idx}
                label={chip.name}
                size="small"
                onClick={chip.fn}
                sx={{
                  background: palette.topicChipBg,
                  color: palette.topicChipText,
                  border: `1px solid ${palette.topicChipBorder}`,
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  height: "22px",
                  cursor: "pointer",
                  "&:hover": {
                    background: palette.chipHoverBg,
                  },
              }}
            />
          ))
         }




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
          letterSpacing: "0.01em",
        }}
      >
        {description.split("\\n").map((d, idx) => d+"\n")}
      </Typography>


        {console.log(testcasesData)}
      {/* ------------------------------- EXAMPLE ------------------------------- */}
      {testcasesData.filter(tc => !tc.isHidden).map((tc, idx) => 
        
       (
      <Box

        key={idx}
        sx={{
          background: palette.exampleBg,
          borderRadius: 2,
          p: 2.5,
          mb: 3,
          borderLeft: `3px solid ${palette.exampleBorder}`,
          border: `1px solid ${palette.cardBorder}`,
          borderLeftWidth: "3px",
          borderLeftColor: palette.exampleBorder,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: palette.labelText,
            fontSize: "0.938rem",
            letterSpacing: "-0.01em",
          }}
        >
          Example {tc?.order ?? ""}:
        </Typography>

        {/* Input */}
        <Box sx={{ mb: 1.5 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              // fontWeight: 600,
              color: palette.textTertiary,
              mb: 0.5,
              // textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Input:
          </Typography>
          <Box
            sx={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              background: palette.codeBg,
              p: 1.5,
              borderRadius: 1.5,
              fontSize: "0.875rem",
              color: palette.textPrimary,
              border: `1px solid ${palette.cardBorder}`,
              overflowX: "auto",
            }}
          >
            {tc?.input_to_show.split("\n").map((item, idx) => <Box key={idx} sx={{paddingY: "3px"}}>{item}</Box>)}
          </Box>
        </Box>

        {/* Output */}
        <Box sx={{ mb: 1.5 }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              // fontWeight: 600,
              color: palette.textTertiary,
              mb: 0.5,
              // textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Output:
          </Typography>
          <Typography
            sx={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              background: palette.codeBg,
              p: 1.5,
              borderRadius: 1.5,
              fontSize: "0.875rem",
              color: palette.textPrimary,
              border: `1px solid ${palette.cardBorder}`,
              overflowX: "auto",
            }}
          >
            {tc?.expected_output_to_show}
          </Typography>
        </Box>

        
        {/* Explanation */}
        {
          tc.explanation !== "" ? 
          <Box>
            <Typography
              sx={{
                fontSize: "0.75rem",
                // fontWeight: 600,
                color: palette.textTertiary,
                mb: 0.5,
                // textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Explanation:
            </Typography>
            <Typography
              sx={{
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                background: palette.codeBg,
                p: 1.5,
                borderRadius: 1.5,
                fontSize: "0.875rem",
                color: palette.textPrimary,
                border: `1px solid ${palette.cardBorder}`,
                overflowX: "auto",
              }}
            >
              {tc?.explanation }
            </Typography>
          </Box> 

          :

          <></>
        }


      </Box>
        )
      )}

      

      {/* ------------------------------- CONSTRAINTS ------------------------------- */}
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          sx={{ 
            fontWeight: 700, 
            mb: 1.5, 
            color: palette.labelText,
            fontSize: "0.938rem",
            letterSpacing: "-0.01em",
          }}
        >
          Constraints:
        </Typography>

        <List dense sx={{ pl: 1 }}>
          {constraintsData.map((item) => (
            <ListItem 
              key={item.id} 
              sx={{ 
                p: 0, 
                mb: 1,
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <Typography
                component="span"
                sx={{
                  color: palette.textSecondary,
                  mr: 1,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                }}
              >
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: palette.textSecondary,
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  fontFamily: "'Inter', -apple-system, sans-serif",
                }}
              >
                {item.content}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider sx={{ mb: 3, borderColor: palette.divider }} />

      {/* ------------------------------- HINTS SECTION ------------------------------- */}
      {hintsData && hintsData.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Lightbulb size={18} color={palette.textPrimary} />
            <Typography
              variant="subtitle1"
              sx={{ 
                fontWeight: 700, 
                color: palette.labelText,
                fontSize: "0.938rem",
                letterSpacing: "-0.01em",
              }}
            >
              Hints
            </Typography>
          </Stack>

          <Stack spacing={1}>
            {hintsData.map((hint, index) => (
              <Accordion
                key={hint.id}
                sx={{
                  backgroundColor: palette.exampleBg,
                  border: `1px solid ${palette.cardBorder}`,
                  borderRadius: "8px !important",
                  "&:before": {
                    display: "none",
                  },
                  "&.Mui-expanded": {
                    margin: "0 !important",
                    marginBottom: "8px !important",
                  },
                  boxShadow: "none",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: palette.textSecondary }} />}
                  sx={{
                    minHeight: "48px",
                    "&.Mui-expanded": {
                      minHeight: "48px",
                    },
                    "& .MuiAccordionSummary-content": {
                      margin: "12px 0",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      color: palette.textPrimary,
                      fontSize: "0.875rem",
                    }}
                  >
                    Hint {index + 1}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    borderTop: `1px solid ${palette.cardBorder}`,
                    pt: 2,
                  }}
                >
                  <Typography
                    sx={{
                      color: palette.textSecondary,
                      fontSize: "0.875rem",
                      lineHeight: 1.6,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {hint.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Box>
      )}

      <Divider sx={{ mb: 3, borderColor: palette.divider }} />

      {/* ------------------------------- TAGS SECTION ------------------------------- */}
      <Stack spacing={3}>
        {/* Topics */}
        <Box ref={topicsRef}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <Code2 size={18} color={palette.textPrimary} />
            <Typography
              variant="subtitle1"
              sx={{ 
                fontWeight: 700, 
                color: palette.labelText,
                fontSize: "0.938rem",
                letterSpacing: "-0.01em",
              }}
            >
              Topics
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {tagsData
              .filter((t) => t.category === "Topic")
              .map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{
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
                  }}
                />
              ))}
          </Stack>
        </Box>

        {/* Companies */}
        <Box ref={companiesRef}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <Building2 size={18} color={palette.textPrimary} />
            <Typography
              variant="subtitle1"
              sx={{ 
                fontWeight: 700, 
                color: palette.labelText,
                fontSize: "0.938rem",
                letterSpacing: "-0.01em",
              }}
            >
              Companies
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {tagsData
              .filter((t) => t.category === "Company")
              .map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  size="small"
                  sx={{
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
                  }}
                />
              ))}
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Description;