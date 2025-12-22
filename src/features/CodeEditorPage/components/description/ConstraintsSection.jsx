import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import BulletList from "../BulletList.jsx";
import CompHeading from '../CompHeading.jsx';

const ConstraintsSection = ({ data }) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;


  return (
    <Box sx={{ mb: 3 }}>

        {/* heading */}
        <CompHeading 
          title={"Constraints: "} 
          sx={{ 
            mb: 2,
            fontWeight: 700, 
            color: palette.labelText,
            fontSize: "0.938rem",
            letterSpacing: "-0.01em", 
          }} 
        />
        <BulletList data={data} />
        
    </Box>
  )
}

export default ConstraintsSection