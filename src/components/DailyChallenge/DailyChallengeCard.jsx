import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import { getDailyChallenge } from "../../api/api";

function DailyChallenge() {
  const theme = useTheme();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user?.id);

  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchDaily = async () => {
      try {
        setLoading(true);

        const problem = await getDailyChallenge(userId);

        if (!problem) return;

        const topics = problem.tags
          .filter((t) => t.category === "Topic")
          .map((t) => t.name);

        const companies = problem.tags
          .filter((t) => t.category === "Company")
          .map((t) => t.name);

        setDailyChallenge({
          ...problem,
          topics,
          companies,
          xp: problem.xp_reward,
        });
      } catch (err) {
        console.error("Failed to fetch daily challenge:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDaily();
  }, [userId]);

  const getDifficultyColor = (difficulty) => {
    const diff = (difficulty || "medium").toLowerCase();
    return theme.palette.difficulty_tags[diff] || {
      background: theme.palette.grey[200],
      text: theme.palette.grey[600],
    };
  };

  const handleNavigate = () => {
    if (dailyChallenge) navigate(`/problem/${dailyChallenge.id}`);
  };

  if (loading || !dailyChallenge) {
    return (
      <Card sx={{ width: 894, maxWidth: "100%", mx: "auto", minHeight: 300 }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton width={120} height={16} />
          <Skeleton width={72} height={24} sx={{ borderRadius: 12 }} />
          <Skeleton height={48} />
          <Skeleton height={22} />
          <Skeleton height={22} />
          <Skeleton height={22} />
          <Skeleton width={180} height={48} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    );
  }

  const difficultyStyle = getDifficultyColor(dailyChallenge.difficulty);

  return (
    <Card
      onClick={handleNavigate}
      sx={{
        width: 894,
        maxWidth: "100%",
        mx: "auto",
        cursor: "pointer",
        "&:hover": { boxShadow: `0 4px 20px ${theme.palette.action.hover}` },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="caption" sx={{ color: "warning.main" }}>
            Daily Challenge
          </Typography>

          <Chip
            label={dailyChallenge.difficulty}
            size="small"
            sx={{
              backgroundColor: difficultyStyle.background,
              color: difficultyStyle.text,
              fontWeight: 600,
            }}
          />
        </Box>

        <Typography variant="h4" sx={{ mb: 2 }}>
          {dailyChallenge.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {dailyChallenge.description?.replace(/\\n/g, " ")}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            {dailyChallenge.topics.map((t, i) => (
              <Chip key={i} label={t} icon={<AccountTreeIcon />} size="small" />
            ))}
            {dailyChallenge.companies.map((c, i) => (
              <Chip key={i} label={c} icon={<BusinessIcon />} size="small" />
            ))}
          </Box>

          <Chip
            icon={<BoltIcon />}
            label={`${dailyChallenge.xp} XP`}
            sx={{ fontWeight: 700 }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={handleNavigate}
          >
            Start Coding
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DailyChallenge;
