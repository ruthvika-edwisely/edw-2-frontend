import { Box } from "@mui/material";
import HeroSection from "../../components/Login/HeroSection";
import LoginCard from "../../components/Login/LoginCard";

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0f172a, #0a0f1f)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 4,
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 400px" },
          alignItems: "center",
          gap: 4,
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <HeroSection />
        <LoginCard />
      </Box>
    </Box>
  );
}
