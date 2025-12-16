import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
  useTheme,
} from "@mui/material";
import ReactECharts from "echarts-for-react";
import { userProgress as mockProgress } from "../../api/api";

function ProgressCard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProgress = async () => {
      await new Promise((res) => setTimeout(res, 500));
      setProgress(mockProgress);
      setLoading(false);
    };

    fetchProgress();
  }, []);

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <Card sx={{ backgroundColor: "background.paper", height: "100%" }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton width={120} height={28} />
          <Box sx={{ display: "flex", gap: 3, mt: 2, mb: 3 }}>
            <Skeleton width={160} height={72} />
            <Skeleton width={160} height={72} />
          </Box>
          <Skeleton height={120} sx={{ borderRadius: 2 }} />
        </CardContent>
      </Card>
    );
  }

  /* ---------------- Data ---------------- */

  const difficultyData = progress?.difficultyProgress || {
    easy: { solved: 20, total: 100 },
    medium: { solved: 15, total: 200 },
    hard: { solved: 10, total: 50 },
  };

  /* ---------------- Chart ---------------- */

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
      data: progress?.weeklyActivity?.map((d) => d.day) || [],
      axisLine: { lineStyle: { color: theme.palette.divider } },
      axisTick: { show: false },
      axisLabel: { color: theme.palette.text.secondary },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: theme.palette.text.secondary },
      splitLine: { show: false },
    },
    series: [
      {
        type: "line",
        smooth: true,
        data: progress?.weeklyActivity?.map((d) => d.problems) || [],
        symbol: "circle",
        symbolSize: 6,
        lineStyle: {
          color: theme.palette.primary.main,
          width: 2,
        },
        itemStyle: {
          color: theme.palette.primary.main,
          borderColor: theme.palette.background.paper,
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: theme.palette.primary.main + "66",
              },
              {
                offset: 1,
                color: theme.palette.primary.main + "00",
              },
            ],
          },
        },
      },
    ],
  };

  /* ---------------- Difficulty bar colors ---------------- */

  const difficultyColors = {
    easy: theme.palette.difficulty_tags.easy,
    medium: theme.palette.difficulty_tags.medium,
    hard: theme.palette.difficulty_tags.hard,
  };

  /* ---------------- UI ---------------- */

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={3}>
          Your Progress
        </Typography>

        {/* Stats */}
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
              {progress?.currentUser?.xp
                ? Math.floor(progress.currentUser.xp / 100)
                : 18}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              XP ACHIEVED
            </Typography>
          </Box>

          {/* Solved */}
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
              {progress?.currentUser?.problemsSolved || 45}
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

        {/* Difficulty */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {["easy", "medium", "hard"].map((level) => {
            const diff = difficultyColors[level];
            const percent =
              (difficultyData[level].solved /
                difficultyData[level].total) *
              100;

            return (
              <Box key={level}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.5,
                  }}
                >
                  <Typography variant="body2" fontWeight={600}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {difficultyData[level].solved}/
                    {difficultyData[level].total}
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={percent}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: diff.background + "33",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: diff.text,
                      borderRadius: 3,
                    },
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProgressCard;
