import { Box, Skeleton, useTheme } from "@mui/material";

const SkeletonBlock = () => {
  const theme = useTheme();
  const p = theme.palette.problemPage;


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      
      <Skeleton
        variant="text"
        width={120}
        height={20}
        sx={{
          mb: 0.5,
          bgcolor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)' 
            : 'rgba(0, 0, 0, 0.08)',
        }}
      />

      <Box
        sx={{
          p: 1.5,
          background: p.codeBg,
          borderRadius: 1.5,
          border: `1px solid ${p.cardBorder}`,
        }}
      >
        <Skeleton
          variant="text"
          width="90%"
          height={20}
          sx={{
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.08)',
          }}
        />
        <Skeleton
          variant="text"
          width="75%"
          height={20}
          sx={{
            bgcolor: theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.08)',
          }}
        />
      </Box>
    </Box>
  );
};


export default SkeletonBlock;