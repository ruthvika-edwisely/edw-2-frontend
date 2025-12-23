import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import Markdown from 'react-markdown'
import CompHeading from '../CompHeading';

const EditorialOverview = ({overview}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;
    

  return (
    <Box
        sx={{
            px: { xs: 3, sm: 5 },
            py: { xs: 3, sm: 4 },
            borderBottom: `1px solid ${palette.cardBorder}`,
        }}
        >

        <CompHeading 
            title={"Overview"}
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
            color: palette.textSecondary,
            lineHeight: 1.75,
            fontSize: "1rem",
            mb: 1.5,
            "&:last-child": { mb: 0 },
            }}
        >
            <Markdown>{overview}</Markdown>
        </Box>
    </Box>
  )
}

export default EditorialOverview