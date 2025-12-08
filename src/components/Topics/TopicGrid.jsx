import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Skeleton } from '@mui/material';
import {
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
  TextFields as TextFieldsIcon,
  Bolt as BoltIcon,
  Hub as HubIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const iconMap = {
  AccountTree: AccountTreeIcon,
  Storage: StorageIcon,
  TextFields: TextFieldsIcon,
  Bolt: BoltIcon,
  Hub: HubIcon,
};

export default function TopicGrid({ selectedTopic, onSelectTopic }) { // ✅ accept props
  const { darkMode } = useOutletContext(); // get darkMode
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get('/api/topics');
        const data = Array.isArray(response.data) ? response.data : [];
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: darkMode ? 'heading.primary' : 'text.primary', mb: 2 }}
        >
          Explore Topics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item} sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '140px' }}>
              <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }} data-testid="section-explore-topics">
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, color: darkMode ? 'heading.primary' : 'text.primary', mb: 2 }}
      >
        Explore Topics
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      {topics.map((topic) => {
  const IconComponent = iconMap[topic.icon] || AccountTreeIcon;
  const isSelected = selectedTopic === topic.name; // highlight if selected

  return (
    <Box
      key={topic.id}
      sx={{ flex: '1 1 calc(20% - 16px)', minWidth: '140px' }}
      onClick={() => onSelectTopic(topic.name)}
    >
      <Card
  sx={{
    backgroundColor: isSelected
      ? darkMode
        ? `${topic.color}30` // Slightly lighter overlay for dark mode
        : `${topic.color}40` // Original overlay for light mode
      : 'background.paper',
    cursor: 'pointer',
    transition: 'all 0.2s',
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: '1px solid',
    borderColor: isSelected
      ? topic.color
      : darkMode
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(0,0,0,0.05)',
    '&:hover': {
      borderColor: topic.color,
      boxShadow: `0 4px 20px ${topic.color}30`,
      transform: 'translateY(-2px)',
    },
  }}
>
  <CardContent
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      py: 2,
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '12px',
        backgroundColor: darkMode
          ? `${topic.color}20`
          : `${topic.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 1.5,
      }}
    >
      <IconComponent
        sx={{
          color: topic.color,
          fontSize: 24,
        }}
      />
    </Box>
    <Typography
      variant="body1"
      sx={{
        fontWeight: 500,
        color: darkMode ? '#fff' : 'text.primary',
        mb: 0.5,
      }}
    >
      {topic.name}
    </Typography>
    <Typography
      variant="caption"
      sx={{
        color: darkMode ? 'rgba(255,255,255,0.6)' : 'text.secondary',
      }}
    >
      {topic.problemCount} Problems
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
