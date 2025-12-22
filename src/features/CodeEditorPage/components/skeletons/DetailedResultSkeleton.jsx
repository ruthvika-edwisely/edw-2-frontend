import { Box, Button, Skeleton, Stack, useTheme } from '@mui/material'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

const DetailedResultSkeleton = ({handleBackToSubmissions}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

  return (
        <Box sx={{ mx: "auto" }}>
            {/* Back Button */}
            <Box
                sx={{
                    borderBottom: `1px solid ${palette.cardBorder}`
                }}
            >
                <Button
                    startIcon={<ArrowLeft size={18} />}
                    onClick={handleBackToSubmissions}
                    sx={{
                        textTransform: "none",
                        color: palette.textSecondary,
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        "&:hover": {
                        backgroundColor: palette.exampleBg,
                        },
                    }}
                >
                    All Submissions
                </Button>
            </Box>

            {/* Header Skeleton */}
            <Box sx={{ display: 'flex', alignItems: 'center', px: 4, gap: 1, mt: 3, mb: 3 }}>
                <Skeleton variant="text" width={150} height={40} sx={{ bgcolor: palette.exampleBg }} />
                <Skeleton variant="text" width={180} height={24} sx={{ bgcolor: palette.exampleBg }} />
            </Box>

            {/* Metrics Cards Skeleton */}
            <Box sx={{ px: 4, py: 3, borderBottom: `1px solid ${palette.cardBorder}`, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Stack direction="row" spacing={2}>
                    <Skeleton variant="rounded" width="50%" height={100} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
                    <Skeleton variant="rounded" width="50%" height={100} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
                </Stack>
                <Stack direction="row" spacing={2}>
                    <Skeleton variant="rounded" width="50%" height={100} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
                    <Skeleton variant="rounded" width="50%" height={100} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
                </Stack>
            </Box>

            {/* Code Section Skeleton */}
            <Box sx={{ px: 4, py: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Skeleton variant="text" width={60} height={28} sx={{ bgcolor: palette.exampleBg }} />
                        <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: "12px", bgcolor: palette.exampleBg }} />
                    </Stack>
                    <Skeleton variant="circular" width={32} height={32} sx={{ bgcolor: palette.exampleBg }} />
                </Stack>

                <Box
                    sx={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: `1px solid ${palette.codeBlockBorder}`,
                        backgroundColor: palette.codeBg,
                        p: 3,
                    }}
                >
                    <Stack spacing={1.5}>
                        {[...Array(15)].map((_, i) => (
                        <Skeleton 
                            key={i} 
                            variant="text" 
                            width={`${Math.random() * 30 + 60}%`} 
                            height={20} 
                            sx={{ bgcolor: palette.exampleBg }} 
                        />
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Box>
  )
}

export default DetailedResultSkeleton