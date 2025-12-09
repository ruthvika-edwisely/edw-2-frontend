import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  BookmarkBorder as BookmarkBorderIcon,
  AccountTree as AccountTreeIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';
import axios from 'axios';

function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  useEffect(() => {
    const fetchDailyChallenge = async () => {
      try {
        const response = await axios.get('/api/daily-challenge');
        setChallenge(response.data);
      } catch (error) {
        console.error('Error fetching daily challenge:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyChallenge();
  }, []);

  const getDifficultyColor = (difficulty) => {
    const diff = (difficulty || 'medium').toLowerCase();
    switch (diff) {
      case 'easy':
        return { bg: theme.palette.difficulty_tags.easy.background, color: theme.palette.difficulty_tags.easy.text };
      case 'medium':
        return { bg: theme.palette.difficulty_tags.medium.background, color: theme.palette.difficulty_tags.medium.text};
      case 'hard':
        return { bg: theme.palette.difficulty_tags.hard.background, color: theme.palette.difficulty_tags.hard.text };
      default:
        return { bg: theme.palette.grey[200] + '40', color: theme.palette.grey[500]};
    }
  };

  if (loading) {
    return (
      <Card
        sx={{
          backgroundColor: 'background.paper',
          height: '100%',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Skeleton variant="text" width={120} height={24} />
          <Skeleton variant="text" width="80%" height={32} sx={{ mt: 1 }} />
          <Skeleton variant="text" width="100%" height={60} sx={{ mt: 2 }} />
          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
            <Skeleton variant="rectangular" width={80} height={40} sx={{ borderRadius: 2 }} />
          </Box>
        </CardContent>
      </Card>
    );
  }

  const difficultyStyle = getDifficultyColor(challenge?.difficulty);

  return (
    <Card
      sx={{
        backgroundColor: 'background.paper',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.15)',
        },
      }}
      data-testid="card-daily-challenge"
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            variant="caption1"
            sx={{
              color: 'warning.main',
              textTransform: 'uppercase',
            }}
          >
            Daily Challenge
          </Typography>
          <Chip
            label={challenge?.difficulty}
            size="small"
            sx={{
              backgroundColor: difficultyStyle.bg,
              color: difficultyStyle.color,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
            }}
            data-testid="text-difficulty-badge"
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 2,
            lineHeight: 1.3,
          }}
          data-testid="text-challenge-title"
        >
          {challenge?.title || 'Optimize Network Delay Time'}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
          data-testid="text-challenge-description"
        >
          {challenge?.description ||
            'You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node...'}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          {challenge?.tags?.map((tag, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'text.secondary',
              }}
            >
              <AccountTreeIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">{tag}</Typography>
            </Box>
          )) || (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                <AccountTreeIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">Graph</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                <AccountTreeIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">Dijkstra</Typography>
              </Box>
            </>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: theme.palette.xp.primary}}>
          <Chip
          icon={<BoltIcon />}
          label="150"
          sx={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.xp.primary}`,
            color: theme.palette.xp.primary,
            fontWeight: 600,
            fontSize: '0.875rem',
            ml: 1,
            '& .MuiChip-icon': { color: theme.palette.xp.primary, ml: 1, fontSize: 16 },
          }}
        />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            sx={{
              backgroundColor: 'primary.main',
              color: theme.palette.common.white,
              px: 3,
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
            data-testid="button-start-coding"
          >
            Start Coding
          </Button>
          <Button
            variant="outlined"
            startIcon={<BookmarkBorderIcon />}
            sx={{
              borderColor: theme.palette.divider,
              color: 'text.primary',
              '&:hover': {
                borderColor: 'text.secondary',
                backgroundColor: theme.palette.action.hover,
              },
            }}
            data-testid="button-save"
          >
            Save
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DailyChallenge;