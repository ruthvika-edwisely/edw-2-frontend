import { Box, Typography, Avatar, Stack } from "@mui/material";

export default function HeroSection() {
  return (
    <Box sx={{ color: "#fff", maxWidth: "600px" }}>
      
      {/* Badge */}
      <Box
        sx={{
          display: "inline-block",
          backgroundColor: "rgba(59,130,246,0.15)",
          color: "#60a5fa",
          px: 2,
          py: 0.6,
          borderRadius: "20px",
          fontSize: "0.8rem",
          mb: 2,
        }}
      >
        🔥 New Daily Challenges Available
      </Box>

      {/* Title */}
      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          fontSize: { xs: "2rem", md: "3rem" },
          lineHeight: 1.2,
          mb: 2,
        }}
      >
        Master Algorithms <br />
        <span style={{ color: "#60a5fa" }}>Powered by AI</span>
      </Typography>

      <Typography
        sx={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "1.1rem",
          maxWidth: "500px",
          mb: 3,
        }}
      >
        Join over 200,000 developers sharpening their coding skills.
        Get real-time AI feedback on your time and space complexity.
      </Typography>

      {/* Avatars + rating */}
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        {/* sample avatars */}
        <Stack direction="row">
          <Avatar
            src="https://i.pravatar.cc/40?img=1"
            sx={{ width: 36, height: 36, ml: 0 }}
          />
          <Avatar
            src="https://i.pravatar.cc/40?img=2"
            sx={{ width: 36, height: 36, ml: -1 }}
          />
          <Avatar
            src="https://i.pravatar.cc/40?img=3"
            sx={{ width: 36, height: 36, ml: -1 }}
          />
        </Stack>

        <Typography sx={{ color: "#fcd34d", fontSize: "0.9rem" }}>
          ★ 4.9/5 by developers
        </Typography>
      </Stack>

      {/* Code block */}
      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          p: 2.5,
          fontFamily: "monospace",
          fontSize: "0.95rem",
          whiteSpace: "pre-line",
          color: "rgba(255,255,255,0.9)",
        }}
      >
{`def solve_challenge(user):
    if user.is_ready:
        return "Level Up! 🚀"
    else:
        practice_more()`}
      </Box>
    </Box>
  );
}
