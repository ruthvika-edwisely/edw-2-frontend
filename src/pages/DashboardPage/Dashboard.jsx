import { Box } from "@mui/material";
import DailyChallengeCard from "../../features/Dashboard/components/DailyChallenge/DailyChallengeCard";
import ProblemTable from "../../features/Dashboard/components/Problems/ProblemTable";
import ProgressCard from "../../features/Dashboard/components/Progress/ProgressCard";
import LeaderboardCard from "../../features/Dashboard/components/Leaderboard/LeaderboardCard";
import TopicGrid from "../../features/Dashboard/components/Topics/TopicGrid";

export default function Dashboard() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
    <Box
      sx={{
        maxWidth: "1440px",
        mx: "auto",
        mt: 4,
        mb: 4,
        px: { xs: 2, sm: 4, md: 6 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr",
            lg: "68fr 32fr",
          },
          columnGap: 4,
          rowGap: 4,
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <DailyChallengeCard />
          <TopicGrid navigateOnClick={true}/>
          <ProblemTable />
        </Box>
  
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <ProgressCard />
          <LeaderboardCard />
        </Box>
      </Box>
    </Box>
  </Box>
  
  );
}

