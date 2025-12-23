import { Box, Chip, Stack, Typography, useTheme } from '@mui/material'
import { Play } from 'lucide-react';
import React from 'react'
import CompHeading from '../CompHeading';

const EditorialHeader = ({title}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;


  return (
    <Box
        sx={{
        px: { xs: 3, sm: 5 },
        pt: { xs: 4, sm: 5 },
        pb: { xs: 3, sm: 4 },
        borderBottom: `1px solid ${palette.cardBorder}`,
        }}
    >
        <Stack spacing={1}>
            <CompHeading 
                title={title}
                variant="h4"
                sx={{
                    fontWeight: 700,
                    color: palette.textPrimary,
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                }}
            />

            <Chip
                icon={<Play size={10} />}
                label="EDITORIAL"
                sx={{
                    width: "fit-content",
                    backgroundColor: palette.editorialChipBg,
                    color: palette.editorialChipText,
                    border: `1px solid ${palette.editorialChipBorder}`,
                    fontWeight: 700,
                    fontSize: "0.5rem",
                    letterSpacing: "0.08em",
                    height: "24px",
                    "& .MuiChip-icon": {
                        color: palette.editorialChipText,
                        marginLeft: "8px",
                        marginRight: "-4px",
                    },
                }}
            />
        </Stack>
    </Box>
  )
}

export default EditorialHeader