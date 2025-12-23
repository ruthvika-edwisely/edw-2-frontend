import { Box, Typography, useTheme } from '@mui/material'
import { Lock } from 'lucide-react'
import React from 'react'

const EditorialLock = ({locked}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;


  return (
    <Box
        sx={{
        p: locked ? 2 : 0
        }}
    >
        {/* Lock Message */}
        {locked && (
        <Box 
            sx={{
            position: "relative",
            px: { xs: 3, sm: 5 },
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            backgroundColor: palette.lockedBg || "rgba(255, 152, 0, 0.08)",
            border: `1px solid ${palette.lockedBorder || "rgba(255, 152, 0, 0.2)"}`,
            borderRadius: 3,
            textAlign: "center",
            }}
        >
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: palette.lockedIconBg || "rgba(255, 152, 0, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Lock
                    size={24} 
                    color={palette.lockedIconColor || "#ff9800"}
                />
            </Box>
            
            <Typography
                variant="h6"
                sx={{
                    color: palette.textPrimary,
                    fontWeight: 700,
                    fontSize: "1rem",
                    letterSpacing: "-0.01em",
                }}
            >
                Editorial Locked
            </Typography>
            
            <Typography
                sx={{
                    color: palette.textSecondary,
                    fontSize: "0.875rem",
                    maxWidth: "400px",
                    lineHeight: 1.6,
                }}
            >
                Editorial will unlock after your<strong style={{ color: palette.textPrimary, fontWeight: 600 }}> first correct submission</strong>
            </Typography>
        </Box>
        )}
    </Box>
  )
}

export default EditorialLock