import { useEffect, useState } from "react";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BoltIcon from "@mui/icons-material/Bolt";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardProblems } from "../../store/features/dashboard/problemDashboardSlice";

function ProblemTable() {
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { problems = [], loading } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardProblems());
  }, [dispatch]);

  /* ---------------- Difficulty style ---------------- */

  const getDifficultyStyle = (difficulty) => {
    const diff = (difficulty || "medium").toLowerCase();

    switch (diff) {
      case "easy":
        return theme.palette.difficulty_tags.easy;
      case "medium":
        return theme.palette.difficulty_tags.medium;
      case "hard":
        return theme.palette.difficulty_tags.hard;
      default:
        return {
          background: theme.palette.grey[200],
          text: theme.palette.text.secondary,
        };
    }
  };

  /* ---------------- Filtering ---------------- */

  const filteredProblems = problems
    .filter((p) =>
      difficultyFilter === "all"
        ? true
        : p.difficulty?.toLowerCase() === difficultyFilter
    )
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.topics || []).some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (p.companies || []).some((c) =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    .filter((p) => p.status !== "solved")
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 5);

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
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
          Problems
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

          <Link component="button" onClick={() => navigate("/all-problems")}>
            View All
          </Link>
        </Box>
      </Box>

      {/* Table */}
      <Card
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
        }}
      >
        {loading ? (
          <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : filteredProblems.length === 0 ? (
          <Typography sx={{ p: 4, textAlign: "center" }}>
            No problems found
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "Status",
                    "Title",
                    "Difficulty",
                    "Acceptance",
                    "XP",
                    "Action",
                  ].map((h) => (
                    <TableCell key={h}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredProblems.map((p) => {
                  const diff = getDifficultyStyle(p.difficulty);
                  const tags = [...(p.topics || []), ...(p.companies || [])];
                  const expanded = expandedRows.includes(p.id);

                  return (
                    <TableRow key={p.id} hover>
                      <TableCell>
                      <Checkbox
  checked={p.status === "solved"}
  sx={{
    transform: "scale(2)", // ⬅️ increase size
    color: theme.palette.grey[400],
    "&.Mui-checked": {
      color: theme.palette.success[600], // ⬅️ green from palette
    },
  }}
/>

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
                                backgroundColor:
                                  theme.palette.problemPage.topicChipBg,
                                color:
                                  theme.palette.problemPage.topicChipText,
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

                      <TableCell>{p.acceptance}%</TableCell>

                      <TableCell>
                        <Chip
                          icon={<BoltIcon />}
                          label={`${p.xp} XP`}
                          sx={{
                            backgroundColor:
                              theme.palette.problemPage.xpBg,
                            border: `1px solid ${theme.palette.xp.primary}`,
                            color: theme.palette.problemPage.xpGold,
                            fontWeight: 700,
                            "& .MuiChip-icon": {
                              color: theme.palette.problemPage.xpGold,
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() =>
                            navigate(`/problem/${p.id}`)
                          }
                          sx={{
                            fontWeight: 700,
                            borderRadius: 2,
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
        )}
      </Card>
    </Box>
  );
}

export default ProblemTable;
