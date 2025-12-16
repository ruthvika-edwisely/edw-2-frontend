import { useEffect } from 'react';
import { Box, Typography, Card, CardContent, Skeleton } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alpha, useTheme } from '@mui/material/styles';

import {
  fetchTopics,
  setSelectedTopic,
  clearSelectedTopic,
} from '../../store/features/topic/topicDashboardSlice';

import {
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
  TextFields as TextFieldsIcon,
  Bolt as BoltIcon,
  Hub as HubIcon,
  AutoFixHigh as AutoFixHighIcon,
  Memory as MemoryIcon,
} from '@mui/icons-material';

const colors = ['#F97316', '#10B981', '#3B82F6', '#F43F5E', '#8B5CF6', '#EAB308'];
const icons = [
  AccountTreeIcon,
  StorageIcon,
  TextFieldsIcon,
  BoltIcon,
  HubIcon,
  AutoFixHighIcon,
  MemoryIcon,
];

export default function TopicGrid({ navigateOnClick = false }) {
  
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { topics, loading, selectedTopic } = useSelector(
    (state) => state.topicDashboard
  );

  useEffect(() => {
    dispatch(fetchTopics());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
          Explore Topics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Skeleton
              key={item}
              variant="rectangular"
              height={140}
              sx={{
                borderRadius: 2,
                flex: '1 1 calc(20% - 16px)',
                minWidth: 140,
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.text.primary, mb: 2 }}>
        Explore Topics
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {topics.map((topic, index) => {
          const color = colors[index % colors.length];
          const IconComponent = icons[index % icons.length];
          const isSelected = selectedTopic === topic.name;

          return (
            <Box
              key={topic.id}
              sx={{ flex: '1 1 calc(20% - 16px)', minWidth: 140, cursor: 'pointer' }}
              onClick={() => {
                if (isSelected) dispatch(clearSelectedTopic());
                else dispatch(setSelectedTopic(topic.name));
                if (navigateOnClick) navigate('/all-problems');
              }}
            >
              <Card
  sx={{
    backgroundColor: isSelected
      ? alpha(color, 0.2)
      : theme.palette.mode === "dark"
        ? theme.palette.grey[800]
        : theme.palette.background.paper,
    height: 150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    borderColor: isSelected ? color : alpha(theme.palette.text.primary, 0.1),
    '&:hover': {
      borderColor: color,
      boxShadow: `0 4px 20px ${alpha(color, 0.3)}`,
      transform: 'translateY(-2px)',
    },
    transition: 'all 0.2s',
    borderRadius: 2,
  }}
>

                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      backgroundColor: alpha(color, 0.15),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.5,
                    }}
                  >
                    <IconComponent sx={{ color: color, fontSize: 24 }} />
                  </Box>

                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5, color: theme.palette.text.primary }}>
                    {topic.name}
                  </Typography>

                  <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                    {topic.problem_count} Problems
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
