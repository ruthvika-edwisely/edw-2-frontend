import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  useTheme,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { fetchUserProgress } from "../../../../api/api";
import ProgressBar from "../../../../components/progressbar/ProgressBar"; // import ProgressBar

function ProgressCard() {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardSx = {
    backgroundColor: "background.paper",
    borderRadius: 3,
    width: { lg: 392 },
    maxWidth: { xs: "100%", lg: 392 },
    minHeight: 456,
  };
  const h1 = { fontWeight: 600, fontSize: 14 }; 

  useEffect(() => {
    if (!user?.id) return;

    const fetchProgress = async () => {
      setLoading(true);
      try {
        const data = await fetchUserProgress(user.id);
        setProgress(data);
      } catch (err) {
        console.error("Error fetching progress:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [user?.id]);

  const difficultyColors = {
    easy: theme.palette.difficulty_tags.easy,
    medium: theme.palette.difficulty_tags.medium,
    hard: theme.palette.difficulty_tags.hard,
  };

  if (!user) {
    return (
      <Card sx={cardSx}>
        <CardContent sx={{ p: 3 }}>
          <Typography>Please login to see your progress.</Typography>
        </CardContent>
      </Card>
    );
  }

  if (loading || !progress) {
    return (
      <Card sx={cardSx}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton width={140} height={28} />
          <Box sx={{ display: "flex", gap: 3, mt: 2, mb: 3 }}>
            <Skeleton width={160} height={72} sx={{ borderRadius: 2 }} />
            <Skeleton width={160} height={72} sx={{ borderRadius: 2 }} />
          </Box>
          <Skeleton height={120} sx={{ borderRadius: 2, mb: 3 }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {["easy", "medium", "hard"].map((level) => (
              <ProgressBar
                key={level}
                label={level.charAt(0).toUpperCase() + level.slice(1)}
                loading={true}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  }

  const difficultyData = progress?.difficultyProgress || {
    easy: { solved: 0, total: 0 },
    medium: { solved: 0, total: 0 },
    hard: { solved: 0, total: 0 },
  };

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyActivity = allDays.map((day) => {
    const dayData = progress?.weeklyActivity?.find((d) => d.day === day);
    return { day, problems: dayData?.problems ?? 0 };
  });

  const chartOptions = {
    grid: { left: "0%", right: "0%", top: "10%", bottom: "10%" },
    tooltip: {
      trigger: "axis",
      backgroundColor: theme.palette.background.paper,
      borderColor: theme.palette.divider,
      textStyle: { color: theme.palette.text.primary },
      formatter: (params) => `${params[0]?.value ?? 0} problems`,
    },
    xAxis: {
      type: "category",
      data: weeklyActivity.map((d) => d.day),
      axisLine: { lineStyle: { color: theme.palette.divider } },
      axisTick: { show: false },
      axisLabel: { color: theme.palette.text.secondary },
    },
    yAxis: {
      type: "value",
      min: 0,
      max: Math.max(...weeklyActivity.map((d) => d.problems), 1),
      minInterval: 1,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: theme.palette.text.secondary },
      splitLine: { show: false },
    },
    series: [
      {
        type: "line",
        smooth: true,
        data: weeklyActivity.map((d) => d.problems),
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: theme.palette.primary.main, width: 2 },
        itemStyle: { color: theme.palette.primary.main, borderColor: theme.palette.background.paper, borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: theme.palette.primary.main + "66" },
              { offset: 1, color: theme.palette.primary.main + "00" },
            ],
          },
        },
      },
    ],
  };

  return (
    <Card sx={cardSx}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Your Progress
        </Typography>

        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          {/* XP */}
          <Box
            sx={{
              width: 160,
              height: 72,
              borderRadius: 2,
              backgroundColor: theme.palette.action.hover,
              border: `1px solid ${theme.palette.divider}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {progress?.currentUser?.xp ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              XP ACHIEVED
            </Typography>
          </Box>

          {/* Solved / Total */}
          <Box
            sx={{
              width: 160,
              height: 72,
              borderRadius: 2,
              backgroundColor: theme.palette.action.hover,
              border: `1px solid ${theme.palette.divider}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" fontWeight={700}>
              {progress?.currentUser?.problemsSolved ?? 0} / {progress?.currentUser?.totalProblems ?? 0}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              SOLVED
            </Typography>
          </Box>
        </Box>

        {/* Chart */}
        <Box sx={{ height: 120, mb: 3 }}>
          <ReactECharts option={chartOptions} style={{ height: "100%" }} />
        </Box>

        {/* Difficulty bars */}
        
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  {["easy", "medium", "hard"].map((level) => {
    const diff = difficultyColors[level];
    const percent =
      difficultyData[level].total > 0
        ? (difficultyData[level].solved / difficultyData[level].total) * 100
        : 0;

    return (
      <ProgressBar
        key={level}
        label={level.charAt(0).toUpperCase() + level.slice(1)}
        labelSx={h1}
        sideText={`${difficultyData[level].solved}/${difficultyData[level].total}`}
        value={percent}
        color={diff.text}
        backgroundColor={diff.background + "33"}
        height={6}
      />
    );
  })}
</Box>

           
      </CardContent>
    </Card>
  );
}

export default ProgressCard;
