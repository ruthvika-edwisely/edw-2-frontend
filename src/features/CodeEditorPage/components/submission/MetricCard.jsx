import { Card, Stack, Typography, useTheme } from '@mui/material'
import { Clock } from 'lucide-react'
import React from 'react'
import CompHeading from '../CompHeading'

const MetricCard = ({icon: Icon, title, data}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

  return (
    <Card
        sx={{
            flex: 1,
            backgroundColor: palette.exampleBg,
            border: `1px solid ${palette.cardBorder}`,
            borderRadius: "12px",
            p: 2.5,
        }}
        elevation={0}
    >
        <Stack spacing={1.5}>
            <Stack direction="row" spacing={1} alignItems="center">
                {Icon && <Icon size={18} color={palette.textTertiary} />}
                <CompHeading 
                    title={title}
                    sx={{
                        color: palette.textTertiary,
                        fontSize: "0.813rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                    }}
                />
                
            </Stack>
            <Typography 
                sx={{ 
                    color: palette.textPrimary, 
                    fontSize: "1.5rem", 
                    fontWeight: 700,
                    lineHeight: 1,
                }}
            >
                {data}
            </Typography>
        </Stack>
    </Card>
  )
}

export default MetricCard