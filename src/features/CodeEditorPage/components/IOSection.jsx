import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import IOBlock from './IOBlock.jsx';

const IOSection = ({ sectionHeading, sectionData, sx={}, blockSx={} }) => {
  
    const theme = useTheme();
    const palette = theme.palette.problemPage;


    if(!sectionData || sectionData === "") {
        return;
    }

    return (
        <Box sx={{ mb: 1.5 }}>
            <Typography
                sx={{
                    fontSize: "0.75rem",
                    // fontWeight: 600,
                    color: palette.textTertiary,
                    mb: 0.5,
                    // textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    ...sx
                }}
            >
                {sectionHeading} : 
            </Typography>
            
            <IOBlock data={sectionData} sx={blockSx} />

        </Box>
    )
}

export default IOSection