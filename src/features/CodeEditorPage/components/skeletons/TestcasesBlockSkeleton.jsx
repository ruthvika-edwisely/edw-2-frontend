import { Box, Skeleton, useTheme } from '@mui/material'
import React from 'react'
import SkeletonBlock from "./SkeletonBlock.jsx";

const TestcasesBlockSkeleton = () => {

    const theme = useTheme();
    const p = theme.palette.problemPage;

  return (
    <>
        {/* Tabs Skeleton */}
        <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
            {[1, 2, 3].map((i) => (
            <Skeleton
                key={i}
                variant="rectangular"
                width={100}
                height={36}
                sx={{
                borderRadius: 1,
                bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(0, 0, 0, 0.08)',
                }}
            />
            ))}
        </Box>

        {/* Content Skeleton */}
        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

                {[1, 2, 3].map((idx) => (
                    <SkeletonBlock
                        key={idx}
                    />
                ))}

            {/* Status Skeleton */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Skeleton
                variant="text"
                width={80}
                height={20}
                sx={{
                    mb: 0.5,
                    bgcolor: theme.palette.mode === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(0, 0, 0, 0.08)',
                }}
                />
                <Box
                sx={{
                    p: 1.5,
                    background: p.codeBg,
                    borderRadius: 1.5,
                    border: `1px solid ${p.cardBorder}`,
                }}
                >
                <Skeleton
                    variant="text"
                    width="60%"
                    height={24}
                    sx={{
                    bgcolor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(0, 0, 0, 0.08)',
                    }}
                />
                </Box>
            </Box>
            </Box>
        </Box>
    </>
  )
}

export default TestcasesBlockSkeleton