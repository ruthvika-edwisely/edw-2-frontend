import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import DailyChallengeCard from "../../components/DailyChallenge/DailyChallengeCard";
import ProblemTable from "../../components/Problems/ProblemTable";
import ProgressCard from "../../components/Progress/ProgressCard";
import LeaderboardCard from "../../components/Leaderboard/LeaderboardCard";
import TopicGrid from "../../components/Topics/TopicGrid";

export default function Dashboard() {
  const { darkMode } = useOutletContext();

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: darkMode ? "#0F172A" : "#F3F4F6" }}>
      {/* MAIN WRAPPER */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
          display: "flex",
          flexDirection: "row",
          gap: 4, // gap BETWEEN columns
          alignItems: "flex-start",
        }}
      >
        {/* LEFT COLUMN */}
        <Box
          sx={{
            flex: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3, // gap BETWEEN items inside left column
          }}
        >
          <DailyChallengeCard />
          {/* TopicGrid handles topic selection */}
          <TopicGrid navigateOnClick={true} />
          <ProblemTable />
        </Box>

        {/* RIGHT COLUMN */}
        <Box
          sx={{
            flex: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ProgressCard />
          <LeaderboardCard />
        </Box>
      </Box>
    </Box>
  );
}
