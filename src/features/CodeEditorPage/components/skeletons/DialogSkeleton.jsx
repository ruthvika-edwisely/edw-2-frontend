import { Box, DialogContent, Skeleton, Stack, useTheme } from "@mui/material";

const DialogSkeleton = () => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

    return (
      <DialogContent sx={{ p: 0, backgroundColor: palette.cardBg }}>
        {/* Header Skeleton */}
        <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}` }}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Skeleton variant="text" width={120} height={32} sx={{ bgcolor: palette.exampleBg }} />
            <Skeleton variant="text" width={150} height={24} sx={{ bgcolor: palette.exampleBg }} />
          </Stack>
        </Box>

        {/* Metrics Cards Skeleton */}
        <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: "flex", flexDirection: "column", gap: 1.5 }}>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
            <Skeleton variant="rounded" width="50%" height={80} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
          </Stack>
        </Box>

        {/* Code Block Skeleton */}
        <Box sx={{ px: 4, py: 3 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2 }}
          >
            <Skeleton variant="text" width={60} height={28} sx={{ bgcolor: palette.exampleBg }} />
            <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: palette.exampleBg }} />
          </Stack>

          <Box
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              border: `1px solid ${palette.codeBlockBorder}`,
              backgroundColor: palette.codeBg,
              p: 3,
            }}
          >
            <Stack spacing={1.5}>
              <Skeleton variant="text" width="90%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="75%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="85%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="80%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="70%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="88%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="92%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="78%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="85%" height={20} sx={{ bgcolor: palette.exampleBg }} />
              <Skeleton variant="text" width="65%" height={20} sx={{ bgcolor: palette.exampleBg }} />
            </Stack>
          </Box>
        </Box>
      </DialogContent>
    );
  };


export default DialogSkeleton;