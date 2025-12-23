import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import CompHeading from '../CompHeading';

const EditorialVideo = ({title, videoUrl}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

  return (
    <Box
        sx={{
        px: { xs: 3, sm: 5 },
        py: { xs: 3, sm: 4 },
        }}
    >

        <CompHeading 
            title={title}
            variant="h6"
            sx={{
                fontWeight: 700,
                color: palette.textPrimary,
                mb: 2.5,
                fontSize: "1.125rem",
                letterSpacing: "-0.02em",
            }}
            
        />

        <Box
            sx={{
                borderRadius: "12px",
                overflow: "hidden",
                border: `1px solid ${palette.videoBorder}`,
                backgroundColor: palette.videoPlaceholderBg,
                aspectRatio: "16/9",
            }}
        >
            <iframe
                width="100%"
                height="100%"
                src={videoUrl?.replace("watch?v=", "embed/")}
                title="Video Explanation"
                style={{ border: "none", display: "block" }}
                allowFullScreen
            ></iframe>
        </Box>
    </Box>
  )
}

export default EditorialVideo