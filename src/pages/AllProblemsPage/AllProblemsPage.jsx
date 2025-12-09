import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  Skeleton,
  TextField,
  InputAdornment,
} from '@mui/material';

import { KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate, useLocation } from 'react-router-dom';
import TopicGrid from "../../components/Topics/TopicGrid";

import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTopic, clearSelectedTopic } from '../../store/features/topic/topicSlice';

export default function AllProblemsPage() {
  const { darkMode, searchQuery, setSearchQuery } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const preselectedTopic = location.state?.topic || '';
  const selectedTopic = useSelector((state) => state.topic.selectedTopic); // ✅ corrected

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  // Initialize selected topic from navigation state
  useEffect(() => {
    if (preselectedTopic) dispatch(setSelectedTopic(preselectedTopic));
  }, [preselectedTopic, dispatch]);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#0F172A" : "#F3F4F6";
  }, [darkMode]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const url =
          difficultyFilter === 'all'
            ? '/api/problems'
            : `/api/problems?difficulty=${difficultyFilter}`;
  
        const response = await axios.get(url);
  
        const data = response.data;
  
        // ✅ FIX: extract the array properly
        setProblems(
          Array.isArray(data) 
            ? data 
            : data.problems || data.data || []
        );
  
      } catch (error) {
        console.error('Error fetching problems:', error);
        setProblems([]); // prevent crash
      } finally {
        setLoading(false);
      }
    };
  
    fetchProblems();
  }, [difficultyFilter]);
  

  const filteredProblems = problems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topics?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTopic = !selectedTopic || p.topics?.includes(selectedTopic);

    return matchesSearch && matchesTopic;
  });

  const handleStatusChange = async (problemId, currentStatus) => {
    const newStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
    try {
      await axios.patch(`/api/problems/${problemId}/status`, { status: newStatus });
      setProblems(
        problems.map((p) => (p.id === problemId ? { ...p, status: newStatus } : p))
      );
    } catch (error) {
      console.error('Error updating problem status:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' };
      case 'medium': return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' };
      case 'hard': return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' };
      default: return { bg: 'rgba(148, 163, 184, 0.15)', color: '#94a3b8' };
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          pt: 4,
          pb: 4,
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
          bgcolor: darkMode ? "#0F172A" : "#F3F4F6",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'text.primary', mb: 2 }}>
          All Problems
        </Typography>
        {[...Array(8)].map((_, idx) => (
          <Skeleton key={idx} variant="rectangular" height={56} sx={{ borderRadius: 1, mb: 1 }} />
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: 4,
        pb: 4,
        px: { xs: 2, sm: 4, md: 6, lg: 10 },
        bgcolor: darkMode ? "#0F172A" : "#F3F4F6",
      }}
    >
      <TopicGrid /> {/* Redux-connected */}

      {selectedTopic && (
        <Box sx={{ mb: 2 }}>
          <Chip
            label={selectedTopic}
            onDelete={() => dispatch(clearSelectedTopic())}
            sx={{
              fontWeight: 500,
              backgroundColor: darkMode ? '#1e293b' : '#e0f2fe',
              color: darkMode ? '#fff' : '#0369a1',
              '& .MuiChip-deleteIcon': { color: darkMode ? '#fff' : '#0369a1' },
            }}
          />
        </Box>
      )}

      {/* Filters + Search */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? '#fff' : 'text.primary' }}>
          All Problems
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{ backgroundColor: "#fff", color: "#000" }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 20, color: '#64748b' }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: 260, '& .MuiOutlinedInput-root': { backgroundColor: '#fff', borderRadius: 1 } }}
          />
        </Box>
      </Box>

      {/* Table */}
      <Card sx={{ backgroundColor: 'background.paper', width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 80 }}>STATUS</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>TITLE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 120 }}>DIFFICULTY</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 120 }}>ACCEPTANCE</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 100 }}>XP</TableCell>
                <TableCell sx={{ color: 'text.secondary', fontWeight: 500, width: 100 }}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProblems.map((problem) => {
                const difficultyStyle = getDifficultyColor(problem.difficulty);
                return (
                  <TableRow key={problem.id} sx={{ '&:hover': { backgroundColor: 'rgba(255,255,255,0.02)' } }}>
                    <TableCell>
                      <Checkbox
                        checked={problem.status === 'solved'}
                        onChange={() => handleStatusChange(problem.id, problem.status)}
                        sx={{ color: 'text.disabled', '&.Mui-checked': { color: 'success.600' }, transform: 'scale(2)' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: 500 }}>{problem.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {problem.topics?.join(', ')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={problem.difficulty} size="small" sx={{ backgroundColor: difficultyStyle.bg, color: difficultyStyle.color, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>{problem.acceptance}%</TableCell>
                    <TableCell>
                      <Chip icon={<BoltIcon />} label={problem.xp} size="small" sx={{ border: '1px solid #f59e0b', color: '#f59e0b', fontWeight: 600, background: 'transparent', '& .MuiChip-icon': { color: '#f59e0b' } }} />
                    </TableCell>
                    <TableCell>
                      <Button sx={{ color: 'primary.main', fontWeight: 600 }} onClick={() => navigate(`/problem/${problem.id}`)}>Solve</Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
