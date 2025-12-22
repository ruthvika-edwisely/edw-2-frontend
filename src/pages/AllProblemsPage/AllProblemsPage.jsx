import { useEffect, useState, useMemo } from "react";
import { Box, Typography, Chip, useTheme, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import DropdownList from "../../components/dropdowns/DropdownList";
import SearchBar from "../../components/searchbar/SearchBar";
import MUIDataGrid from "../../components/dataGrid/MUIDataGrid";
import TopicGrid from "../../features/Dashboard/components/Topics/TopicGrid";
import InfoCard from "../../components/cards/InfoCard";

import { clearSelectedTopic} from "../../store/reducers/topicDashboardReducer";
import { fetchDashboardProblems } from "../../store/actions/dashboardActions";

import BoltIcon from "@mui/icons-material/Bolt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SchoolIcon from "@mui/icons-material/School"; // Example icon for topics
import ProblemTable from "../../features/Dashboard/components/Problems/ProblemTable";
export default function AllProblemsPage() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState([]);
  const [error, setError] = useState(null);

  const { problems = [], loading } = useSelector((state) => state.dashboard);
  const selectedTopic = useSelector((state) => state.topicDashboard.selectedTopic);

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
    return theme.palette.difficulty_tags[diff] || {};
  };

  const toggleExpand = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

 
 

  // Example topics for Explore section

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default", py: 4 }}>
      <Box sx={{ maxWidth: "1440px", mx: "auto", px: { xs: 2, sm: 4, md: 6 } }}>
        <TopicGrid />

        {/* Explore Topics */}
       

        {/* Selected Topic Chip */}
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

        {/* Header */}
        {/* Use ProblemTable for All Problems */}
        <ProblemTable showSolved={true} maxRows={Infinity} selectedTopic={selectedTopic} />
      </Box>
    </Box>
  );
}