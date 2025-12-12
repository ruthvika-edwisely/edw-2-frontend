import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Skeleton,
  useTheme,
} from '@mui/material';
import ReactECharts from 'echarts-for-react';
<<<<<<< HEAD
import { userProgress as mockProgress } from '../../api/api'; 
=======
import axios from 'axios';
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef

function ProgressCard() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchProgress = async () => {
<<<<<<< HEAD
      // simulate delay for realism
      await new Promise((res) => setTimeout(res, 500));
      setProgress(mockProgress);
      setLoading(false);
=======
      try {
        const response = await axios.get('/api/progress');
        setProgress(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      } finally {
        setLoading(false);
      }
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
    };

    fetchProgress();
  }, []);

<<<<<<< HEAD

=======
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
  if (loading) {
    return (
      <Card sx={{ backgroundColor: 'background.paper', height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={120} height={28} />
          <Box sx={{ display: 'flex', gap: 4, mt: 2, mb: 3 }}>
            <Skeleton variant="rectangular" width={80} height={60} />
            <Skeleton variant="rectangular" width={80} height={60} />
          </Box>
          <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2 }} />
        </CardContent>
      </Card>
    );
  }

  const difficultyData = progress?.difficultyProgress || {
    easy: { solved: 20, total: 100 },
    medium: { solved: 15, total: 200 },
    hard: { solved: 10, total: 50 },
  };

  // ------------------------
  // ECharts Options
  // ------------------------
  const chartOptions = {
    xAxis: {
      type: 'category',
      data: progress?.weeklyActivity?.map((d) => d.day) || [],
      axisLine: { lineStyle: { color: theme.palette.text.secondary } },
      axisTick: { show: false },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: theme.palette.text.secondary } },
      axisTick: { show: false },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 12 },
      splitLine: { show: false },
    },
    tooltip: {
      trigger: 'axis',
<<<<<<< HEAD
      backgroundColor: theme.palette.primary.main,
=======
      backgroundColor: theme.palette.background.elevated,
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
      textStyle: { color: theme.palette.common.white },
      padding: [8, 12],
      formatter: (params) => {
        const val = params[0]?.value ?? 0;
        return `${val} problems`;
      },
    },
    series: [
      {
        data: progress?.weeklyActivity?.map((d) => d.problems) || [],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#3b82f6',
          width: 2,
        },
        itemStyle: {
          color: '#3b82f6',
          borderColor: theme.palette.background.paper,
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.4)' }, // top
              { offset: 1, color: 'rgba(59, 130, 246, 0)' },   // bottom
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
      },
    ],
    grid: { left: '0%', right: '0%', top: '10%', bottom: '10%' },
  };

  return (
    <Card sx={{ backgroundColor: 'background.paper', height: '100%', margin: '20px 0px' }} data-testid="card-your-progress">
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 3 }}>
          Your Progress
        </Typography>

        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
          {/* XP Box */}
          <Box
            sx={{
              width: "159px",
              height: "72px",
              borderRadius: "12px",
              backgroundColor: theme.palette.grey[100],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "primary.main", lineHeight: 1 }}>
              {progress?.currentUser?.xp ? Math.floor(progress.currentUser.xp / 100) : 18}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              XP ACHIEVED
            </Typography>
          </Box>

          {/* Solved Box */}
          <Box
            sx={{
              width: "159px",
              height: "72px",
              borderRadius: "12px",
              backgroundColor: theme.palette.grey[100],
              border: "1px solid rgba(255,255,255,1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary", lineHeight: 1 }}>
              {progress?.currentUser?.problemsSolved || 45}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              SOLVED
            </Typography>
          </Box>
        </Box>

        {/* ECharts Area Chart */}
        <Box sx={{ height: 120, mb: 3 }}>
          <ReactECharts option={chartOptions} style={{ height: '100%', width: '100%' }} />
        </Box>

        {/* Difficulty Progress Bars */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {['easy', 'medium', 'hard'].map((level) => (
            <Box key={level}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {difficultyData[level].solved}/{difficultyData[level].total}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(difficultyData[level].solved / difficultyData[level].total) * 100}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  backgroundColor:
                    level === 'easy'
                      ? 'rgba(34, 197, 94, 0.2)'
                      : level === 'medium'
                      ? 'rgba(245, 158, 11, 0.2)'
                      : 'rgba(239, 68, 68, 0.2)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor:
                      level === 'easy'
                        ? 'success.700'
                        : level === 'medium'
                        ? 'warning.main'
                        : 'error.main',
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProgressCard;
