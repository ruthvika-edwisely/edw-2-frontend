import React from "react";
import { Card, CardContent, Typography, Box, LinearProgress } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function InfoCard({
  isIconHead = false,        // true → heading is icon, false → heading is text
  headingIcon: HeadingIcon,  // MUI icon component if isIconHead
  headingText = "",          // heading text if !isIconHead
  contentText = "",          // optional subtext
  subContentText = "",       // optional bottom text
  progress = null,           // {solved, total} for LinearProgress
  color = "#3B82F6",         // primary color for icon / progress bar
  sxCard = {},               // Card styles
  sxHeadingBox = {},         // Heading Box styles
  sxHeadingIcon = {},        // Heading icon styles
  sxHeadingText = {},        // Heading text styles
  sxContentText = {},        // content text styles
  sxSubContentText = {},     // bottom text styles
  sxProgress = {},           // LinearProgress styles
  onClick = null,            // click handler
}) {
  const percent = progress
    ? progress.total > 0
      ? (progress.solved / progress.total) * 100
      : 0
    : 0;

  return (
    <Card
      sx={{
        borderRadius: 2,
        cursor: onClick ? "pointer" : "default",
        transition: "all 0.2s",
        ...sxCard,
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 1.5,
          gap: 1,
        }}
      >
        {/* Heading */}
        {isIconHead ? (
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              backgroundColor: alpha(color, 0.15),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ...sxHeadingBox,
            }}
          >
            {HeadingIcon && <HeadingIcon sx={{ color, fontSize: 24, ...sxHeadingIcon }} />}
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color, ...sxHeadingText }}
          >
            {headingText}
          </Typography>
        )}

        {/* Main content */}
        {contentText && (
          <Typography
            variant="body1"
            sx={{ fontWeight: 500, color: "text.primary", ...sxContentText }}
          >
            {contentText}
          </Typography>
        )}

        {/* Sub content */}
        {subContentText && (
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", ...sxSubContentText }}
          >
            {subContentText}
          </Typography>
        )}

        {/* LinearProgress if provided */}
        {progress && (
          <Box sx={{ width: "100%", mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={percent}
              sx={{
                height: 6,
                borderRadius: 3,
                backgroundColor: alpha(color, 0.3),
                "& .MuiLinearProgress-bar": { backgroundColor: color, borderRadius: 3 },
                ...sxProgress,
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
