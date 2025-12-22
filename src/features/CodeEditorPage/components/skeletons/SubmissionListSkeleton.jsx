import { Box, Paper, Skeleton, Stack, useTheme } from "@mui/material";
import CompHeading from "../CompHeading";

const SubmissionsListSkeleton = () => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

    return (
      <Box sx={{ maxWidth: "900px", mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: palette.cardBg,
            border: `1px solid ${palette.cardBorder}`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box sx={{ px: 5, py: 4, borderBottom: `1px solid ${palette.cardBorder}` }}>
            <CompHeading 
                title={"Submissions"}
                variant="h4"
                sx={{ fontWeight: 700, color: palette.textPrimary }}
            />
          </Box>

          {/* Skeleton Rows */}
          <Stack spacing={0}>
            {[...Array(3)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr auto",
                  alignItems: "center",
                  gap: 3,
                  px: 5,
                  py: 3,
                  borderBottom: index < 2 ? `1px solid ${palette.cardBorder}` : "none",
                }}
              >
                {/* Status and Date Column */}
                <Stack spacing={0.5}>
                  <Skeleton variant="text" width={100} height={24} sx={{ bgcolor: palette.exampleBg }} />
                  <Skeleton variant="text" width={80} height={20} sx={{ bgcolor: palette.exampleBg }} />
                </Stack>

                {/* Language */}
                <Skeleton variant="text" width={70} height={24} sx={{ bgcolor: palette.exampleBg }} />

                {/* Execution Time */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: palette.exampleBg }} />
                  <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: palette.exampleBg }} />
                </Stack>

                {/* Memory */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={16} height={16} sx={{ bgcolor: palette.exampleBg }} />
                  <Skeleton variant="text" width={70} height={20} sx={{ bgcolor: palette.exampleBg }} />
                </Stack>

                {/* View Code Button */}
                <Skeleton variant="rounded" width={100} height={36} sx={{ borderRadius: "8px", bgcolor: palette.exampleBg }} />
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    );
  };


export default SubmissionsListSkeleton;