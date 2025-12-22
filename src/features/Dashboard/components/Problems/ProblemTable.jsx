import { useEffect, useState, useMemo } from "react";
import { Box, Typography, Button, Link, useTheme } from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DropdownList from "../../../../components/dropdowns/DropdownList";
import SearchBar from "../../../../components/searchbar/SearchBar";
import { fetchDashboardProblems } from "../../../../store/actions/dashboardActions";
import MUIDataGrid from "../../../../components/dataGrid/MUIDataGrid";
import TagChip from "../../../../components/chips/TagChip"; // Import TagChip
import PrimaryActionButton from "../../../../components/buttons/PrimaryActionButton";
import HyperlinkButton from "../../../../components/buttons/HyperlinkButton";
import {useLocation } from "react-router-dom";


export default function ProblemTable({
  showSolved = false,          // Whether to include solved problems
  maxRows = 5,                 // Limit number of rows
  selectedTopic = null,        // Optional topic filter
}) {
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { problems = [], loading } = useSelector((state) => state.dashboard);
  const location = useLocation();
  const isAllProblemsPage = location.pathname.startsWith("/all-problems");

  const toggleExpand = (id) => {
    setExpandedRows((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const difficultyOptions = [
    { value: "all", label: "All" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

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
    switch (diff) {
      case "easy":
        return theme.palette.difficulty_tags.easy;
      case "medium":
        return theme.palette.difficulty_tags.medium;
      case "hard":
        return theme.palette.difficulty_tags.hard;
      default:
        return { background: theme.palette.grey[200], text: theme.palette.text.secondary };
    }
  };

  const filteredProblems = useMemo(() => {
    return problems
      .filter((p) => (difficultyFilter === "all" ? true : p.difficulty?.toLowerCase() === difficultyFilter))
      .filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.topics || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (p.companies || []).some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .filter((p) => showSolved ? true : p.status !== "solved")
      .filter((p) => (selectedTopic ? p.topics?.includes(selectedTopic) : true))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, maxRows)
      .map((p) => ({
        ...p,
        id: p.id,
        acceptance: p.acceptance ?? p.acceptance_rate ?? 0,
      }));
  }, [problems, difficultyFilter, searchQuery, showSolved, maxRows, selectedTopic]);

  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 80,
      renderCell: (params) =>
        params.row.status === "solved" ? (
          <CheckCircleIcon sx={{ color: theme.palette.success[600], fontSize: 22 }} />
        ) : null,
      sortable: false,
      filterable: false,
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => {
        const tags = [...(params.row.topics || []), ...(params.row.companies || [])];
        const isExpanded = expandedRows.includes(params.row.id);

        return (
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
            <Typography fontWeight={600}>{params.row.title}</Typography>
            <Box sx={{ mt: 0.5, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              {(isExpanded ? tags : tags.slice(0, 3)).map((t, i) => (
                <TagChip
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
              {!isExpanded && tags.length > 3 && (
                <TagChip
                  label={`+${tags.length - 3}`}
                  size="small"
                  onClick={() => toggleExpand(params.row.id)}
                  sx={{ cursor: "pointer" }}
                />
              )}
            </Box>
          </Box>
        );
      },
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      width: 110,
      renderCell: (params) => {
        const diff = getDifficultyStyle(params.value);
        return <TagChip label={params.value} size="small" sx={{ backgroundColor: diff.background, color: diff.text, fontWeight: 600 }} />;
      },
    },
    {
      field: "acceptance",
      headerName: "Acceptance",
      width: 100,
      renderCell: (params) => `${params.value}%`,
    },
    {
      field: "xp",
      headerName: "XP",
      width: 140,
      renderCell: (params) => (
        <TagChip
          icon={<BoltIcon />}
          label={`${params.value} XP`}
          size="medium"
          sx={{
            backgroundColor: theme.palette.problemPage.xpBg,
            border: `1px solid ${theme.palette.xp.primary}`,
            color: theme.palette.problemPage.xpGold,
            fontWeight: 700,
            "& .MuiChip-icon": { color: theme.palette.problemPage.xpGold },
          }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <PrimaryActionButton
          label="Solve"
          onClick={() => navigate(`/problem/${params.row.id}`)}
          sx={{ fontWeight: 700, borderRadius: 2 }}
        />
      ),
      sortable: false,
      filterable: false,
    },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Problems
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <DropdownList
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            options={difficultyOptions}
            size="small"
            sx={{ minWidth: 120, backgroundColor: theme.palette.background.paper, borderRadius: 2 }}
          />

          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search problems"
            sx={{ width: 300 }}
          />

{!isAllProblemsPage && <HyperlinkButton label="View All" to="/all-problems" />}

        </Box>
      </Box>

      {/* DataGrid */}
      <MUIDataGrid
        rows={filteredProblems}
        columns={columns}
        loading={loading}
        rowHeight={90}
      />

      {error && (
        <Typography sx={{ mt: 2, textAlign: "center", color: theme.palette.error.main }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
