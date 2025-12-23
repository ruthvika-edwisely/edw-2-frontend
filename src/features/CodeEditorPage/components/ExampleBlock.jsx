import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import IOSection from './IOSection.jsx';

const ExampleBlock = ({ tc, idx }) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;
    
    const headingSx = {
        mb: 2,
        fontWeight: 700,
        color: palette.labelText,
        fontSize: "0.938rem",
        letterSpacing: "-0.01em",
    };
    
    const cardSx = {
        background: palette.exampleBg,
        borderRadius: 2,
        p: 2.5,
        mb: 3,
        borderLeft: `3px solid ${palette.exampleBorder}`,
        border: `1px solid ${palette.cardBorder}`,
        borderLeftWidth: "3px",
        borderLeftColor: palette.exampleBorder,
    };


  return (
        <Box
            key={idx}
            sx={cardSx}
        >
            {/* heading */}
            <Typography 
                variant='subtitle1'
                sx={headingSx}
            >
                Example {tc?.order ?? ""} :
            </Typography>

            {/* Input */}
            <IOSection sectionHeading={"Input"} sectionData={tc?.input_to_show} />
        
            {/* Output */}
            <IOSection sectionHeading={"Output"} sectionData={tc?.expected_output_to_show} />

            {/* Explanation */}
            <IOSection sectionHeading={"Explanation"} sectionData={tc?.explanation} />  
        </Box>
    )
}

export default ExampleBlock