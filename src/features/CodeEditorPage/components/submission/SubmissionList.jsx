import { Box, Paper, Stack, Typography, useTheme } from '@mui/material';
import React from 'react'
import SubmissionsListSkeleton from '../skeletons/SubmissionListSkeleton';
import SubmissionRow from './SubmissionRow';
import CompHeading from '../CompHeading';

const SubmissionList = ({submitCode, regularSubmissions, handleViewCode}) => {

    const theme = useTheme();
    const palette = theme.palette.problemPage;

    if (submitCode) {
      return <SubmissionsListSkeleton />
    }
  
    return (
      <Box sx={{ maxWidth: "900px", mx: "auto" }}>
        <Paper
          elevation={0}
          sx={{
            backgroundColor: palette.cardBg,
            border: `1px solid ${palette.cardBorder}`,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box sx={{ px: 5, py: 4, borderBottom: `1px solid ${palette.cardBorder}` }}>
            <CompHeading 
                title={"Submissions"}
                variant="h4" 
                sx={{ fontWeight: 700, color: palette.textPrimary }}
            />
          </Box>

          {/* Submissions List */}
          <Stack spacing={0}>
            {regularSubmissions.map((sub, index) => <SubmissionRow sub={sub} index={index} handleViewCode={handleViewCode} regSubLen={regularSubmissions?.length || 0}  />)}

            {regularSubmissions.length === 0 && (
              <Box sx={{ px: 5, py: 8, textAlign: "center" }}>
                <CompHeading 
                    title={"No submissions yet"}
                    sx={{ color: palette.textTertiary, fontSize: "0.938rem" }}
                />
              </Box>
            )}
          </Stack>
        </Paper>
      </Box>
    )
}

export default SubmissionList