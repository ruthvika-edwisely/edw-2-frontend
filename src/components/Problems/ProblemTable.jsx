import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  Link,
  TextField,
  InputAdornment,
  Checkbox,
  Card,
  CircularProgress,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { getProblems } from '../../api/api.js';
import axios from 'axios';

function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const navigate = useNavigate();
  const theme = useTheme();

  const { darkMode, searchQuery = "", setSearchQuery } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    const fetchProblems = async () => {
      try {
        const data = await getProblems(difficultyFilter);
        console.log("Fetched problems:", data);
<<<<<<< HEAD
  
        const normalizedProblems = (Array.isArray(data) ? data : []).map(p => ({
          ...p,
          status: p.status || 'unsolved',   // default status
          acceptance: p.acceptance || 0,    // default acceptance %
          topics: p.topics || [],            // default empty array
          xp: p.xp_reward || 0               // rename xp_reward to xp
        }));
  
=======

        const normalizedProblems = (Array.isArray(data) ? data : []).map(p => ({
          ...p,
          status: p.status || 'unsolved',
          acceptance: p.acceptance || 0,
          topics: p.topics || [],
          xp: p.xp_reward || 0
        }));

>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
        setProblems(normalizedProblems);
      } catch (err) {
        console.error(err);
        setProblems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, [difficultyFilter]);
<<<<<<< HEAD
  
=======

>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
  const safeProblems = Array.isArray(problems) ? problems : [];
  const filteredProblems = safeProblems.filter(
    (p) =>
      p.title.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      (p.topics || []).some((t) =>
        t.toLowerCase().includes((searchQuery || "").toLowerCase())
      )
  );
<<<<<<< HEAD
  console.log("searchQuery:", searchQuery);
  console.log("safeProblems:", safeProblems);
  console.log("filteredProblems:", filteredProblems);

=======
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef

  const handleStatusChange = async (problemId, currentStatus) => {
    const newStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
    try {
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/problems/${problemId}/status`, {
        status: newStatus,
      });
      setProblems(
        problems.map((p) => (p.id === problemId ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return { bg: 'rgba(34,197,94,0.15)', color: '#22c55e' };
      case 'medium':
        return { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' };
      case 'hard':
        return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' };
      default:
        return { bg: '#e5e7eb', color: '#6b7280' };
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
<<<<<<< HEAD
      {/* Header */}
=======
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? '#fff' : '#000' }}>
          Problems
        </Typography>

<<<<<<< HEAD
        {/* Filters Row */}
=======
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                minWidth: 120,
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
                '& .MuiSvgIcon-root': { color: '#000' },
              }}
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
            sx={{
              width: 260,
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#fff',
                borderRadius: 1,
                '& fieldset': { borderColor: '#E5E7EB' },
                '&:hover fieldset': { borderColor: '#D1D5DB' },
                '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              },
            }}
          />

          <Link
            component="button"
            onClick={() => navigate('/all-problems')}
            sx={{
              color: darkMode ? '#fff' : '#000',
              fontWeight: 500,
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            View All
          </Link>
        </Box>
      </Box>

<<<<<<< HEAD
      {/* Table */}
=======
>>>>>>> b75ce4079ecb7e99ad1b4cb0c51f2ed6561506ef
      <Card sx={{ backgroundColor: '#fff', minHeight: 200 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredProblems.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: 'center', color: '#888' }}>
            No problems found.
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Difficulty</TableCell>
                  <TableCell>Acceptance</TableCell>
                  <TableCell>XP</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProblems.slice(0, 5).map((p) => {
                  const difficultyStyle = getDifficultyColor(p.difficulty);
                  return (
                    <TableRow key={p.id}>
                      <TableCell>
                        <Checkbox
                          checked={p.status === 'solved'}
                          onChange={() => handleStatusChange(p.id, p.status)}
                          sx={{
                            color: theme.palette.grey[500],
                            '&.Mui-checked': { color: '#22c55e' },
                            transform: 'scale(2)',
                            padding: 0,
                            mr: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 600 }}>{p.title}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>
                          {p.topics?.join(', ')}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={p.difficulty}
                          size="small"
                          sx={{
                            backgroundColor: difficultyStyle.bg,
                            color: difficultyStyle.color,
                            fontWeight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell>{p.acceptance}%</TableCell>
                      <TableCell>
                        <Chip
                          icon={<BoltIcon />}
                          label={p.xp}
                          sx={{
                            backgroundColor: 'transparent',
                            border: `1px solid ${theme.palette.xp?.primary || '#1976d2'}`,
                            color: theme.palette.xp?.primary || '#1976d2',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            '& .MuiChip-icon': { color: theme.palette.xp?.primary || '#1976d2', fontSize: 16 },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => navigate(`/problem/${p.id}`)}
                          sx={{ color: theme.palette.primary.main, fontWeight: 600 }}
                        >
                          Solve
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </Box>
  );
}

export default ProblemTable;
