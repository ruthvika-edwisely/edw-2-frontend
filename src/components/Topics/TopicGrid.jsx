import { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Skeleton } from '@mui/material';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTopic, clearSelectedTopic } from '../../store/features/topic/topicSlice';
import {
  AccountTree as AccountTreeIcon,
  Storage as StorageIcon,
  TextFields as TextFieldsIcon,
  Bolt as BoltIcon,
  Hub as HubIcon,
} from '@mui/icons-material';
<<<<<<< HEAD
import { topics as dummyTopics } from "../../api/api"; // adjust path accordingly

=======
import axios from 'axios';
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
const iconMap = { AccountTree: AccountTreeIcon, Storage: StorageIcon, TextFields: TextFieldsIcon, Bolt: BoltIcon, Hub: HubIcon };

export default function TopicGrid({ navigateOnClick = false }) {
  const { darkMode } = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTopic = useSelector(state => state.topic.selectedTopic);

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
<<<<<<< HEAD
        // simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setTopics(dummyTopics);
=======
        const response = await axios.get('/api/topics');
        setTopics(Array.isArray(response.data) ? response.data : []);
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
      } catch {
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);
<<<<<<< HEAD
  
=======
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef

  if (loading) {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? 'heading.primary' : 'text.primary', mb: 2 }}>
          Explore Topics
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4, 5].map(item => (
            <Skeleton key={item} variant="rectangular" height={140} sx={{ borderRadius: 2, flex: '1 1 calc(20% - 16px)', minWidth: 140 }} />
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? 'heading.primary' : 'text.primary', mb: 2 }}>
        Explore Topics
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {topics.map(topic => {
          const IconComponent = iconMap[topic.icon] || AccountTreeIcon;
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
                  backgroundColor: isSelected ? (darkMode ? `${topic.color}30` : `${topic.color}40`) : '#fff',
                  height: 140,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid',
                  borderColor: isSelected ? topic.color : 'rgba(0,0,0,0.05)',
                  '&:hover': {
                    borderColor: topic.color,
                    boxShadow: `0 4px 20px ${topic.color}30`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', py: 2 }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, backgroundColor: `${topic.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.5 }}>
                    <IconComponent sx={{ color: topic.color, fontSize: 24 }} />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>{topic.name}</Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{topic.problemCount} Problems</Typography>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
