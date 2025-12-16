import { Box } from "@mui/material";
import DailyChallengeCard from "../../components/DailyChallenge/DailyChallengeCard";
import ProblemTable from "../../components/Problems/ProblemTable";
import ProgressCard from "../../components/Progress/ProgressCard";
import LeaderboardCard from "../../components/Leaderboard/LeaderboardCard";
import TopicGrid from "../../components/Topics/TopicGrid";

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* MAIN WRAPPER */}
      <Box
        sx={{
          mt: 4,
          mb: 4,
          px: { xs: 2, sm: 4, md: 6, lg: 10 },
          display: "flex",
          flexDirection: "row",
          gap: 4,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT COLUMN */}
        <Box
          sx={{
            flex: 2.08,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <DailyChallengeCard />
         <TopicGrid navigateOnClick={true} />
          <ProblemTable /> 
        </Box>

        
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <ProgressCard />
          <LeaderboardCard />
            {/* LEFT COLUMN  */}
        </Box>
      </Box>
    </Box>
  );
}
