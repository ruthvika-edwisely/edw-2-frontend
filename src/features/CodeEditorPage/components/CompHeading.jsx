import { Stack, Typography, useTheme } from '@mui/material'
import React from 'react'

const CompHeading = ({icon: Icon, title, variant="subtitle1", sx}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;
    

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ ...sx }}>

        {Icon && (
            <Icon size={18} color={palette.textPrimary} />
        )}

        <Typography
            variant={variant}
            sx={{ 
                ...sx
            }}
        >
            {title}
        </Typography>

    </Stack>
  )
}

export default CompHeading