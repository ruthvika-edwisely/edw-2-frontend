import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  useTheme,
} from "@mui/material";
import {
  PlayArrow as PlayArrowIcon,
  Business as BusinessIcon,
  AccountTree as AccountTreeIcon,
  Bolt as BoltIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getDailyChallenge } from "../../../../api/api";
import { TagChip, PrimaryActionButton } from "../../../../components";

/* ------------------------------------------------------------------ */

function DailyChallenge() {
  const theme = useTheme();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?.id);

  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ------------------------------------------------------------------ */
  /* Chip styles (page-owned, explicit) */
  /* ------------------------------------------------------------------ */

  const topicChipSx = {
    backgroundColor: theme.palette.problemPage.topicChipBg,
    color: theme.palette.problemPage.topicChipText,
    border: `1px solid ${theme.palette.problemPage.topicChipBorder}`,
    fontWeight: 600,
  };

  const companyChipSx = {
    backgroundColor: theme.palette.problemPage.companyChipBg,
    color: theme.palette.problemPage.companyChipText,
    border: `1px solid ${theme.palette.problemPage.companyChipBorder}`,
    fontWeight: 600,
  };

  const xpChipSx = {
    backgroundColor: theme.palette.problemPage.xpBg,
    border: `1px solid ${theme.palette.xp.primary}`,
    color: theme.palette.problemPage.xpGold,
    fontWeight: 700,
    height: 32,
    "& .MuiChip-icon": {
      color: theme.palette.problemPage.xpGold,
    },
  };
  const primaryCtaSx = {
    fontWeight: 600,
    px: 3,
    py: 1,
    borderRadius: 2,
    textTransform: "none",
  };
  

  const difficultyChipSx = dailyChallenge
    ? (() => {
        const token =
          theme.palette.difficulty_tags?.[
            dailyChallenge.difficulty?.toLowerCase()
          ];

        return token
          ? {
              backgroundColor: token.background,
              color: token.text,
              fontWeight: 600,
              fontSize: "0.75rem",
              height: 24,
            }
          : {};
      })()
    : {};

  /* ------------------------------------------------------------------ */
  /* Data fetching */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setLoading(true);
        const problem = await getDailyChallenge(userId);

        if (!problem) return;

        const topics = problem.tags
          .filter((tag) => tag.category === "Topic")
          .map((tag) => tag.name);

        const companies = problem.tags
          .filter((tag) => tag.category === "Company")
          .map((tag) => tag.name);

        setDailyChallenge({
          ...problem,
          topics,
          companies,
          xp: problem.xp_reward,
        });
      } catch (error) {
        console.error("Failed to fetch daily challenge:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDaily();
  }, [userId]);

  /* ------------------------------------------------------------------ */
  /* Handlers */
  /* ------------------------------------------------------------------ */

  const handleNavigate = () => {
    if (dailyChallenge) {
      navigate(`/problem/${dailyChallenge.id}`);
    }
  };

  /* ------------------------------------------------------------------ */
  /* Loading state */
  /* ------------------------------------------------------------------ */

  if (loading) {
    return (
      <Card
        sx={{
          backgroundColor: "background.paper",
          width: 894,
          maxWidth: "100%",
          mx: "auto",
          minHeight: 300,
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Skeleton height={16} width={120} />
            <TagChip loading />
          </Box>
  
          {/* Title */}
          <Skeleton variant="text" height={48} sx={{ mb: 2 }} />
  
          {/* Description */}
          <Skeleton variant="text" height={22} />
          <Skeleton variant="text" height={22} />
          <Skeleton variant="text" height={22} sx={{ mb: 3 }} />
  
          {/* Tags + XP */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                {[1, 2, 3].map((i) => (
                  <TagChip key={i} loading skeletonWidth={90} />
                ))}
              </Box>
  
              <Box sx={{ display: "flex", gap: 1 }}>
                {[1, 2].map((i) => (
                  <TagChip key={i} loading skeletonWidth={100} />
                ))}
              </Box>
            </Box>
  
            <TagChip loading skeletonWidth={80} />
          </Box>
  
          {/* Action */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <PrimaryActionButton loading />
          </Box>
        </CardContent>
      </Card>
    );
  }
  

  /* ------------------------------------------------------------------ */
  /* Render */
  /* ------------------------------------------------------------------ */

  return (
    <Card
      onClick={handleNavigate}
      sx={{
        backgroundColor: "background.paper",
        width: 894,
        maxWidth: "100%",
        mx: "auto",
        minHeight: 300,
        cursor: "pointer",
        transition: "box-shadow 0.2s",
        "&:hover": {
          boxShadow: `0 4px 20px ${theme.palette.action.hover}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography
            variant="caption1"
            sx={{ color: "warning.main", textTransform: "uppercase" }}
          >
            Daily Challenge
          </Typography>

          <TagChip
            label={dailyChallenge.difficulty}
            sx={difficultyChipSx}
          />
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{ fontWeight: 600, mb: 2, lineHeight: 1.3 }}
        >
          {dailyChallenge.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}
        >
          {dailyChallenge.description?.replace(/\\n/g, " ")}
        </Typography>

        {/* Tags + XP */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 3,
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {dailyChallenge.topics.map((topic) => (
    <TagChip
      key={topic}
      label={topic}
      icon={<AccountTreeIcon />}
      sx={topicChipSx}
    />
  ))}
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {dailyChallenge.companies.map((company) => (
                <TagChip
                  key={company}
                  label={company}
                  icon={<BusinessIcon />}
                  sx={companyChipSx}
                />
              ))}
              
            </Box>
          </Box>

          <TagChip
            label={`${dailyChallenge.xp} XP`}
            icon={<BoltIcon />}
            sx={xpChipSx}
          />
        </Box>

        {/* Action */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <PrimaryActionButton
  label="Start Coding"
  startIcon={<PlayArrowIcon />}
  onClick={handleNavigate}
  sx={{
    ...primaryCtaSx,
  }}
/>

        </Box>
      </CardContent>
    </Card>
  );
}

export default DailyChallenge;
