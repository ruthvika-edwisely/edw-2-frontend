import { Box } from "@mui/material";
import DailyChallengeCard from "../../components/DailyChallenge/DailyChallengeCard";
import ProblemTable from "../../components/Problems/ProblemTable";
import ProgressCard from "../../components/Progress/ProgressCard";
import LeaderboardCard from "../../components/Leaderboard/LeaderboardCard";
import TopicGrid from "../../components/Topics/TopicGrid";

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
          <TopicGrid navigateOnClick />
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

