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
<<<<<<< HEAD
  CircularProgress,
=======
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

<<<<<<< HEAD
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { getProblems } from '../../api/api.js';
import axios from 'axios';
=======
import axios from 'axios';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca

function ProblemTable() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const navigate = useNavigate();
  const theme = useTheme();

<<<<<<< HEAD
  const { darkMode, searchQuery = "", setSearchQuery } = useOutletContext();
=======
  // From Outlet context (LayoutPage)
  const { darkMode, searchQuery, setSearchQuery } = useOutletContext();
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca

  useEffect(() => {
    setLoading(true);
    const fetchProblems = async () => {
      try {
<<<<<<< HEAD
        const data = await getProblems(difficultyFilter);
        console.log("Fetched problems:", data);
  
        const normalizedProblems = (Array.isArray(data) ? data : []).map(p => ({
          ...p,
          status: p.status || 'unsolved',   // default status
          acceptance: p.acceptance || 0,    // default acceptance %
          topics: p.topics || [],            // default empty array
          xp: p.xp_reward || 0               // rename xp_reward to xp
        }));
  
        setProblems(normalizedProblems);
      } catch (err) {
        console.error(err);
        setProblems([]);
=======
        const url =
          difficultyFilter === 'all'
            ? '/api/problems'
            : `/api/problems?difficulty=${difficultyFilter}`;

        const response = await axios.get(url);
        setProblems(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
    fetchProblems();
  }, [difficultyFilter]);
  
  const safeProblems = Array.isArray(problems) ? problems : [];
  const filteredProblems = safeProblems.filter(
    (p) =>
      p.title.toLowerCase().includes((searchQuery || "").toLowerCase()) ||
      (p.topics || []).some((t) =>
        t.toLowerCase().includes((searchQuery || "").toLowerCase())
      )
  );
  console.log("searchQuery:", searchQuery);
  console.log("safeProblems:", safeProblems);
  console.log("filteredProblems:", filteredProblems);

=======

    fetchProblems();
  }, [difficultyFilter]);

  // Searching
  const filteredProblems = problems.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topics?.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca

  const handleStatusChange = async (problemId, currentStatus) => {
    const newStatus = currentStatus === 'solved' ? 'unsolved' : 'solved';
    try {
<<<<<<< HEAD
      await axios.patch(`${import.meta.env.VITE_BASE_URL}/problems/${problemId}/status`, {
        status: newStatus,
      });
      setProblems(
        problems.map((p) => (p.id === problemId ? { ...p, status: newStatus } : p))
      );
    } catch (err) {
      console.error("Error updating status:", err);
=======
      await axios.patch(`/api/problems/${problemId}/status`, {
        status: newStatus,
      });
      setProblems(
        problems.map((p) =>
          p.id === problemId ? { ...p, status: newStatus } : p
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
    }
  };

  const getDifficultyColor = (difficulty) => {
<<<<<<< HEAD
    switch (difficulty?.toLowerCase()) {
=======
    switch (difficulty.toLowerCase()) {
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
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
      {/* Header */}
<<<<<<< HEAD
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: darkMode ? '#fff' : '#000' }}>
=======
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: darkMode ? '#fff' : '#000' }}
        >
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
          Problems
        </Typography>

        {/* Filters Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
<<<<<<< HEAD
=======
          {/* Difficulty Filter */}
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
          <FormControl size="small">
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              IconComponent={KeyboardArrowDownIcon}
              sx={{
<<<<<<< HEAD
                backgroundColor: '#fff',
                color: '#000',
                minWidth: 120,
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#D1D5DB' },
=======
                backgroundColor:'#fff',
                color: '#000',
                minWidth: 120,
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#D1D5DB',
                },
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
                '& .MuiSvgIcon-root': { color: '#000' },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
            </Select>
          </FormControl>

<<<<<<< HEAD
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

=======
          {/* Search */}
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


          {/* View All */}
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
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

      {/* Table */}
<<<<<<< HEAD
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
=======
      <Card sx={{ backgroundColor: '#fff' }}>
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
    checked={p.status === "solved"}
    onChange={() => handleStatusChange(p.id, p.status)}
    sx={{
      color: theme.palette.grey[500],              // unchecked border
      '&.Mui-checked': {
        color: '#22c55e',                          // solved = green
      },
      transform: 'scale(2)',                     // slightly smaller than your 1.4
      padding: 0,
      mr: 1,
    }}
  />
</TableCell>



                    <TableCell>
                      <Typography sx={{ fontWeight: 600 }}>
                        {p.title}
                      </Typography>
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
                           border: `1px solid ${theme.palette.xp.primary}`,
                           color: theme.palette.xp.primary,
                           fontWeight: 600,
                           fontSize: '0.875rem',
                           '& .MuiChip-icon': {
                             color: theme.palette.xp.primary,
                             fontSize: 16,
                           },
                         }}
                      />
                    </TableCell>

                    <TableCell>
                      <Button
                        onClick={() => navigate(`/problem/${p.id}`)}
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 600,
                        }}
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
>>>>>>> 2aa2b4266616bb52af9f44a9561ee5c516b2e1ca
      </Card>
    </Box>
  );
}

export default ProblemTable;
