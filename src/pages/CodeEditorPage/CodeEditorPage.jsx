import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PanelGroup, Panel } from 'react-resizable-panels'
import ProblemDescriptionSection from '../../features/CodeEditorPage/ProblemDescriptionSection/ProblemDescriptionSection.jsx';
import CodeEditorSection from '../../features/CodeEditorPage/CodeEditorSection/CodeEditorSection.jsx';
import FloatingCodingAssistant from '../../features/CodeEditorPage/CodeAssistantSection/FloatingCodingAssistant.jsx';
import HorizontalHandle from '../../features/CodeEditorPage/components/HorizontalHandle.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProblemData } from "../../store/features/problem/problemSlice.js";
import { togglePanelVisibility } from '../../store/features/showAIPanel/showAISlice.js';
import { getProblemById } from '../../api/api.js';
import { getLatestSubmissionData, getTestcaseResults } from '../../store/features/submission/submissionSlice.js';
import { useTheme } from '@mui/material/styles';

// Skeleton Component
const CodeEditorPageSkeleton = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === "light";

  // Define colors based on theme
  const bgMain = isLight ? theme.palette.grey[50] : "#1e1e1e";
  const bgCard = isLight ? theme.palette.common.white : "#252525";
  const bgCode = isLight ? theme.palette.grey[100] : "#1e1e1e";
  const borderColor = isLight ? theme.palette.grey[300] : "#333";
  const skeletonBg = isLight ? theme.palette.grey[200] : "#2d2d2d";
  const skeletonAnimation = isLight 
    ? 'linear-gradient(90deg, transparent, rgba(0,0,0,0.04), transparent)'
    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)';

  return (
    <Box sx={{ 
      height: "100vh", 
      display: "flex",
      bgcolor: bgMain
    }}>
      <PanelGroup direction='horizontal'>
        
        {/* Left Side - Problem Description Skeleton */}
        <Panel defaultSize={35} minSize={25}>
          <Box sx={{ 
            height: "100%", 
            p: 3, 
            overflow: "auto",
            bgcolor: bgMain,
            borderRight: `1px solid ${borderColor}`
          }}>
            {/* Title */}
            <Skeleton 
              variant="text" 
              width="70%" 
              height={40} 
              sx={{ 
                mb: 2,
                bgcolor: skeletonBg,
                '&::after': {
                  background: skeletonAnimation
                }
              }}
            />
            
            {/* Difficulty & Tags */}
            <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
              <Skeleton 
                variant="rounded" 
                width={80} 
                height={24} 
                sx={{ 
                  bgcolor: skeletonBg,
                  '&::after': {
                    background: skeletonAnimation
                  }
                }} 
              />
              <Skeleton 
                variant="rounded" 
                width={100} 
                height={24} 
                sx={{ 
                  bgcolor: skeletonBg,
                  '&::after': {
                    background: skeletonAnimation
                  }
                }} 
              />
              <Skeleton 
                variant="rounded" 
                width={90} 
                height={24} 
                sx={{ 
                  bgcolor: skeletonBg,
                  '&::after': {
                    background: skeletonAnimation
                  }
                }} 
              />
            </Box>

            {/* Description Lines */}
            {[100, 95, 90].map((width, i) => (
              <Skeleton 
                key={i}
                variant="text" 
                width={`${width}%`} 
                height={20} 
                sx={{ 
                  mb: 1,
                  bgcolor: skeletonBg,
                  '&::after': {
                    background: skeletonAnimation
                  }
                }} 
              />
            ))}

            {/* Example Section */}
            <Skeleton 
              variant="text" 
              width="30%" 
              height={30} 
              sx={{ 
                mb: 2, 
                mt: 3,
                bgcolor: skeletonBg,
                '&::after': {
                  background: skeletonAnimation
                }
              }} 
            />
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={120} 
              sx={{ 
                mb: 3, 
                borderRadius: 1,
                bgcolor: isLight ? theme.palette.grey[100] : "#252525",
                '&::after': {
                  background: skeletonAnimation
                }
              }} 
            />

            {/* Constraints */}
            <Skeleton 
              variant="text" 
              width="40%" 
              height={30} 
              sx={{ 
                mb: 2,
                bgcolor: skeletonBg,
                '&::after': {
                  background: skeletonAnimation
                }
              }} 
            />
            {[100, 85, 80].map((width, i) => (
              <Skeleton 
                key={i}
                variant="text" 
                width={`${width}%`} 
                height={20} 
                sx={{ 
                  mb: 1,
                  bgcolor: skeletonBg,
                  '&::after': {
                    background: skeletonAnimation
                  }
                }} 
              />
            ))}
          </Box>
        </Panel>

        <HorizontalHandle />

        {/* Right Side - Code Editor & Testcases */}
        <Panel defaultSize={65} minSize={40}>
          <PanelGroup direction='vertical'>
            
            {/* Top - Code Editor Skeleton */}
            <Panel defaultSize={60} minSize={30}>
              <Box sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column",
                bgcolor: bgCode
              }}>
                {/* Editor Header */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderBottom: `1px solid ${borderColor}`,
                  bgcolor: bgCard
                }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton 
                      variant="rounded" 
                      width={100} 
                      height={32} 
                      sx={{ 
                        bgcolor: skeletonBg,
                        '&::after': {
                          background: skeletonAnimation
                        }
                      }} 
                    />
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={32} 
                      sx={{ 
                        bgcolor: skeletonBg,
                        '&::after': {
                          background: skeletonAnimation
                        }
                      }} 
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={32} 
                      sx={{ 
                        bgcolor: skeletonBg,
                        '&::after': {
                          background: skeletonAnimation
                        }
                      }} 
                    />
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={32} 
                      sx={{ 
                        bgcolor: skeletonBg,
                        '&::after': {
                          background: skeletonAnimation
                        }
                      }} 
                    />
                  </Box>
                </Box>

                {/* Editor Body */}
                <Box sx={{ flex: 1, p: 2, bgcolor: bgCode }}>
                  {[...Array(12)].map((_, i) => (
                    <Skeleton 
                      key={i}
                      variant="text" 
                      width={`${Math.random() * 30 + 60}%`} 
                      height={24} 
                      sx={{ 
                        mb: 0.5,
                        bgcolor: skeletonBg,
                        '&::after': {
                          background: skeletonAnimation
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Panel>

            <HorizontalHandle />

            {/* Bottom - Testcases Skeleton */}
            <Panel defaultSize={40} minSize={20}>
              <Box sx={{ 
                height: "100%", 
                display: "flex", 
                flexDirection: "column",
                bgcolor: bgCode
              }}>
                {/* Testcase Header */}
                <Box sx={{ 
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderTop: `1px solid ${borderColor}`,
                  borderBottom: `1px solid ${borderColor}`,
                  bgcolor: bgCard
                }}>
                  {[80, 80, 80].map((width, i) => (
                    <Skeleton 
                      key={i}
                      variant="rounded" 
                      width={width} 
                      height={32} 
                      sx={{ 
                        bgcolor: skeletonBg,
                        '&::after': {
                          background: skeletonAnimation
                        }
                      }} 
                    />
                  ))}
                </Box>

                {/* Testcase Body */}
                <Box sx={{ flex: 1, p: 2, bgcolor: bgCode }}>
                  <Skeleton 
                    variant="text" 
                    width="20%" 
                    height={24} 
                    sx={{ 
                      mb: 1,
                      bgcolor: skeletonBg,
                      '&::after': {
                        background: skeletonAnimation
                      }
                    }} 
                  />
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={60} 
                    sx={{ 
                      mb: 2, 
                      borderRadius: 1,
                      bgcolor: isLight ? theme.palette.grey[100] : "#252525",
                      border: `1px solid ${borderColor}`,
                      '&::after': {
                        background: skeletonAnimation
                      }
                    }} 
                  />
                  
                  <Skeleton 
                    variant="text" 
                    width="30%" 
                    height={24} 
                    sx={{ 
                      mb: 1,
                      bgcolor: skeletonBg,
                      '&::after': {
                        background: skeletonAnimation
                      }
                    }} 
                  />
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={60} 
                    sx={{ 
                      borderRadius: 1,
                      bgcolor: isLight ? theme.palette.grey[100] : "#252525",
                      border: `1px solid ${borderColor}`,
                      '&::after': {
                        background: skeletonAnimation
                      }
                    }} 
                  />
                </Box>
              </Box>
            </Panel>
          </PanelGroup>
        </Panel>

      </PanelGroup>
    </Box>
  );
};

const CodeEditorPage = () => {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(state => state.auth.user);
  console.log("userrrrrrrrrr... : ", user);

  // Redux selectors
  const showAI = useSelector(state => state.showAIPanel.showAI);
  const problemData = useSelector(state => state.problem.data); // Get problem data from Redux
  const currentCode = useSelector(state => state.code?.current || state.editor?.code || ''); // Adjust based on your Redux structure

  useEffect(() => {
    const loadProblemData = async() => {
      try {
        const data = await getProblemById(id);

        console.log(data);
        
        dispatch(getProblemData({id, data}));
        dispatch(getLatestSubmissionData(null));
        dispatch(getTestcaseResults([]));
      }
      finally {
        setLoading(false);
      }
    }
    loadProblemData();

  }, [id]);

  if(loading) {
    return <CodeEditorPageSkeleton />;
  }

  return (
    <Box sx={{height: "100vh"}}>
      <PanelGroup direction='horizontal' height="50%">
        {/* left */}
        <ProblemDescriptionSection />

        {/* resize handle */}
        <HorizontalHandle />

        {/* center */}
        <CodeEditorSection />
      </PanelGroup>

      {showAI && (
        <FloatingCodingAssistant 
          problem={problemData} 
          code={currentCode} 
        />
      )}
    </Box>
  )
}

export default CodeEditorPage