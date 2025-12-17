import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
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
import { getDailyChallenge } from "../../api/api.js"; // your API function

function DailyChallenge() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDaily = async () => {
      try {
        setLoading(true);
        const problem = await getDailyChallenge();
  
        if (problem) {
          // Separate tags by category
          const topics = problem.tags.filter(tag => tag.category === "Topic").map(tag => tag.name);
          const companies = problem.tags.filter(tag => tag.category === "Company").map(tag => tag.name);
  
          setDailyChallenge({
            ...problem,
            topics,
            companies,
            xp: problem.xp_reward  // map xp_reward to xp
          });
        }
      } catch (err) {
        console.error("Failed to fetch daily challenge:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDaily();
  }, []);
  

  const getDifficultyColor = (difficulty) => {
    const diff = (difficulty || "medium").toLowerCase();
    switch (diff) {
      case "easy":
        return { bg: theme.palette.difficulty_tags.easy.background, color: theme.palette.difficulty_tags.easy.text };
      case "medium":
        return { bg: theme.palette.difficulty_tags.medium.background, color: theme.palette.difficulty_tags.medium.text };
      case "hard":
        return { bg: theme.palette.difficulty_tags.hard.background, color: theme.palette.difficulty_tags.hard.text };
      default:
        return { bg: theme.palette.grey[200] + "40", color: theme.palette.grey[500] };
    }
  };

  const handleNavigate = () => {
    if (dailyChallenge) navigate(`/problem/${dailyChallenge.id}`);
  };

  if (loading || !dailyChallenge) {
    return (
      <Card sx={{ backgroundColor: "background.paper", width: 894, maxWidth: "100%", mx: "auto", minHeight: 300 }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton height={16} width={120} />
          <Skeleton height={24} width={72} sx={{ borderRadius: 12 }} />
          <Skeleton variant="text" width="100%" height={48} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={22} />
          <Skeleton variant="text" width="100%" height={22} />
          <Skeleton variant="text" width="100%" height={22} sx={{ mb: 3 }} />
          <Skeleton height={32} width={88} sx={{ borderRadius: 16 }} />
          <Skeleton height={48} width={180} sx={{ borderRadius: 12, mt: 2 }} />
        </CardContent>
      </Card>
    );
  }

  const difficultyStyle = getDifficultyColor(dailyChallenge.difficulty);

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
        "&:hover": { boxShadow: `0 4px 20px ${theme.palette.action.hover}` },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="caption1" sx={{ color: "warning.main", textTransform: "uppercase" }}>
            Daily Challenge
          </Typography>
          <Chip
            label={dailyChallenge.difficulty}
            size="small"
            sx={{ backgroundColor: difficultyStyle.bg, color: difficultyStyle.color, fontWeight: 500, fontSize: "0.75rem", height: 24 }}
          />
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 600, color: "text.primary", mb: 2, lineHeight: 1.3 }}>
          {dailyChallenge.title}
        </Typography>

        <Typography variant="body1" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6, whiteSpace: "pre-line" }}>
          {dailyChallenge.description?.replace(/\\n/g, " ")}
        </Typography>

        {/* TAGS + XP */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3, gap: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {dailyChallenge.topics?.map((topic, index) => (
                <Chip key={`topic-${index}`} label={topic} icon={<AccountTreeIcon sx={{ fontSize: 16 }} />} size="small"
                  sx={{ backgroundColor: theme.palette.problemPage.topicChipBg, color: theme.palette.problemPage.topicChipText, border: `1px solid ${theme.palette.problemPage.topicChipBorder}`, fontWeight: 600 }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {dailyChallenge.companies?.map((company, index) => (
                <Chip key={`company-${index}`} label={company} icon={<BusinessIcon sx={{ fontSize: 16 }} />} size="small"
                  sx={{ backgroundColor: theme.palette.problemPage.companyChipBg, color: theme.palette.problemPage.companyChipText, border: `1px solid ${theme.palette.problemPage.companyChipBorder}`, fontWeight: 600 }}
                />
              ))}
            </Box>
          </Box>

          <Chip icon={<BoltIcon />} label={`${dailyChallenge.xp} XP`}
            sx={{ backgroundColor: theme.palette.problemPage.xpBg, border: `1px solid ${theme.palette.xp.primary}`, color: theme.palette.problemPage.xpGold, fontWeight: 700, fontSize: "0.9rem", height: 32, "& .MuiChip-icon": { color: theme.palette.problemPage.xpGold, fontSize: 18 } }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={handleNavigate} variant="contained" startIcon={<PlayArrowIcon />}
            sx={{ background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`, color: theme.palette.common.white, px: 4, py: 1.5, fontWeight: 700, fontSize: "1rem", borderRadius: 2, boxShadow: "0 4px 14px rgba(59,130,246,0.25)",
              "&:hover": { background: `linear-gradient(90deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`, transform: "translateY(-2px)", boxShadow: "0 6px 18px rgba(59,130,246,0.35)" },
              "&:active": { transform: "translateY(0px)", boxShadow: "0 3px 10px rgba(59,130,246,0.2)" } }}
          >
            Start Coding
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DailyChallenge;
