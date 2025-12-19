import { Box, LinearProgress, Typography, Skeleton } from "@mui/material";

function ProgressBar({
  label,
  value = 0,
  sideText,            // <-- New prop for right-side text
  loading = false,
  color = "#1976d2",
  backgroundColor = "#e0e0e0",
  height = 8,
  labelSx,
  progressSx,
  containerSx,
  ...props
}) {
  if (loading) {
    return (
      <Box sx={containerSx}>
        <Skeleton width="60%" height={14} />
        <Skeleton height={height} sx={{ mt: 2, borderRadius: height / 2 }} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", ...containerSx }}>
      {(label || sideText) && (
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          {label && <Typography sx={labelSx}>{label}</Typography>}
          {sideText && <Typography variant="body2" color="text.secondary">{sideText}</Typography>}
        </Box>
      )}

      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height,
          borderRadius: height / 2,
          backgroundColor: backgroundColor,
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
            borderRadius: height / 2,
          },
          ...progressSx,
        }}
        {...props}
      />
    </Box>
  );
}

export default ProgressBar;
