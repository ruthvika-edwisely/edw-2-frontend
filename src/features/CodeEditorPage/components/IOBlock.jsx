import { Box, useTheme } from '@mui/material'
import React from 'react'

const IOBlock = ({ data, sx={} }) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

  return (
    <Box
        sx={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            background: palette.codeBg,
            p: 1.5,
            borderRadius: 1.5,
            fontSize: "0.875rem",
            color: palette.textPrimary,
            border: `1px solid ${palette.cardBorder}`,
            overflowX: "auto",
            ...sx
        }}
    >
        {data?.split("\n").map((item, idx) => <Box key={idx} sx={{paddingY: "3px"}}>{item}</Box>)}
    </Box>
  )
}

export default IOBlock