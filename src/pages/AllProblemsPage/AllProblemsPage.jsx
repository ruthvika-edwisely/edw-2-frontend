import { useEffect, useState, useMemo } from "react";
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
  TextField,
  InputAdornment,
  Card,
  Skeleton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BoltIcon from "@mui/icons-material/Bolt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

import TopicGrid from "../../components/Topics/TopicGrid";
import { clearSelectedTopic } from "../../store/features/topic/topicDashboardSlice";
import { fetchDashboardProblems } from "../../store/features/dashboard/problemDashboardSlice";

function AllProblemsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [error, setError] = useState(null);

  const { problems = [], loading } = useSelector((state) => state.dashboard);
  const selectedTopic = useSelector(
    (state) => state.topicDashboard.selectedTopic
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        await dispatch(fetchDashboardProblems()).unwrap();
      } catch (err) {
        console.error(err);
        setError("Failed to load problems.");
      }
    };
    fetchData();
  }, [dispatch]);

  const getDifficultyStyle = (difficulty) => {
    const diff = (difficulty || "medium").toLowerCase();
    return theme.palette.difficulty_tags[diff];
  };

  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) =>
        difficultyFilter === "all"
          ? true
          : p.difficulty?.toLowerCase() === difficultyFilter
      )
      .filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.title?.toLowerCase().includes(q) ||
          (p.topics || []).some((t) => t.toLowerCase().includes(q)) ||
          (p.companies || []).some((c) => c.toLowerCase().includes(q))
        );
      })
      .filter((p) =>
        selectedTopic ? p.topics?.includes(selectedTopic) : true
      )
      .sort((a, b) => b.xp - a.xp);
  }, [problems, difficultyFilter, searchQuery, selectedTopic]);

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "background.default",
        py: 4,
      }}
    >
      {/* CENTERED CONTAINER */}
      <Box
        sx={{
          maxWidth: "1440px",
          mx: "auto",
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <TopicGrid />

        {selectedTopic && (
          <Chip
            label={selectedTopic}
            onDelete={() => dispatch(clearSelectedTopic())}
            sx={{
              mb: 2,
              backgroundColor: theme.palette.problemPage.topicChipBg,
              color: theme.palette.problemPage.topicChipText,
              border: `1px solid ${theme.palette.problemPage.topicChipBorder}`,
              fontWeight: 600,
            }}
          />
        )}

        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            All Problems
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FormControl size="small">
              <Select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                IconComponent={KeyboardArrowDownIcon}
                sx={{
                  minWidth: 120,
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                }}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>

            <TextField
              size="small"
              placeholder="Search problems"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: 260,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>

        {/* TABLE */}
        {/* TABLE */}
<Card
  sx={{
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.background.paper
        : theme.palette.grey[0],
    borderRadius: 3,
  }}
>
  <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          {["Status", "Title", "Difficulty", "Acceptance", "XP", "Action"].map(
            (h) => (
              <TableCell
                key={h}
                sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                {h}
              </TableCell>
            )
          )}
        </TableRow>
      </TableHead>

      <TableBody>
        {loading
          ? Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton variant="circular" width={24} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton width="80%" height={24} />
                  <Skeleton width="60%" height={18} sx={{ mt: 0.5 }} />
                </TableCell>
                <TableCell>
                  <Skeleton width={60} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton width={40} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton width={60} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton width={80} height={32} />
                </TableCell>
              </TableRow>
            ))
          : filteredProblems.map((p) => {
              const diff = getDifficultyStyle(p.difficulty);
              const tags = [...(p.topics || []), ...(p.companies || [])];
              const expanded = expandedRows.includes(p.id);

              return (
                <TableRow
                  key={p.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(0,0,0,0.03)",
                    },
                    "& td": { borderBottom: `1px solid ${theme.palette.divider}` },
                  }}
                >
                  <TableCell>
                    {p.status === "solved" && (
                      <CheckCircleIcon
                        sx={{
                          color: theme.palette.success[600],
                          fontSize: 22,
                        }}
                      />
                    )}
                  </TableCell>

                  <TableCell>
                    <Typography fontWeight={600}>{p.title}</Typography>
                    <Box
                      sx={{
                        mt: 0.5,
                        display: "flex",
                        gap: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {(expanded ? tags : tags.slice(0, 3)).map((t, i) => (
                        <Chip
                          key={i}
                          label={t}
                          size="small"
                          sx={{
                            backgroundColor: theme.palette.problemPage.topicChipBg,
                            color: theme.palette.problemPage.topicChipText,
                            border: `1px solid ${theme.palette.problemPage.topicChipBorder}`,
                            fontWeight: 600,
                          }}
                        />
                      ))}
                      {!expanded && tags.length > 3 && (
                        <Chip
                          label={`+${tags.length - 3}`}
                          size="small"
                          onClick={() => toggleExpand(p.id)}
                        />
                      )}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={p.difficulty}
                      size="small"
                      sx={{
                        backgroundColor: diff.background,
                        color: diff.text,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>

                  <TableCell>{p.acceptance ?? p.acceptance_rate ?? 0}%</TableCell>

                  <TableCell>
                    <Chip
                      icon={<BoltIcon />}
                      label={`${p.xp} XP`}
                      sx={{
                        backgroundColor: theme.palette.problemPage.xpBg,
                        border: `1px solid ${
                          theme.palette.mode === "dark"
                            ? theme.palette.xp.primary
                            : theme.palette.grey[300]
                        }`,
                        color: theme.palette.problemPage.xpGold,
                        fontWeight: 700,
                        "& .MuiChip-icon": { color: theme.palette.problemPage.xpGold },
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => navigate(`/problem/${p.id}`)}
                      sx={{ fontWeight: 700, borderRadius: 2 }}
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
</Card>

      </Box>
    </Box>
  );
}


export default AllProblemsPage;
