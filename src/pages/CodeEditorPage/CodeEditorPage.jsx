import { Box, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PanelGroup, Panel } from 'react-resizable-panels'
import ProblemDescriptionSection from '../../features/CodeEditorPage/ProblemDescriptionSection/ProblemDescriptionSection.jsx';
import CodeEditorSection from '../../features/CodeEditorPage/CodeEditorSection/CodeEditorSection.jsx';
import CodingAssistantSection from '../../features/CodeEditorPage/CodeAssistantSection/CodingAssistantSection.jsx';
import HorizontalHandle from '../../features/CodeEditorPage/components/HorizontalHandle.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProblemData } from "../../store/features/problem/problemSlice.js";
import { togglePanelVisibility } from '../../store/features/showAIPanel/showAISlice.js';
import { getProblemById } from '../../api/api.js';
import { getLatestSubmissionData, getTestcaseResults } from '../../store/features/submission/submissionSlice.js';

// Skeleton Component
const CodeEditorPageSkeleton = () => {
  return (
    <Box sx={{ 
      height: "100vh", 
      display: "flex",
      bgcolor: "#1e1e1e" // Dark background
    }}>
      <PanelGroup direction='horizontal'>
        
        {/* Left Side - Problem Description Skeleton */}
        <Panel defaultSize={35} minSize={25}>
          <Box sx={{ 
            height: "100%", 
            p: 3, 
            overflow: "auto",
            bgcolor: "#1e1e1e",
            borderRight: "1px solid #333"
          }}>
            {/* Title */}
            <Skeleton 
              variant="text" 
              width="70%" 
              height={40} 
              sx={{ 
                mb: 2,
                bgcolor: "#2d2d2d",
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                  bgcolor: "#2d2d2d",
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                  }
                }} 
              />
              <Skeleton 
                variant="rounded" 
                width={100} 
                height={24} 
                sx={{ 
                  bgcolor: "#2d2d2d",
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                  }
                }} 
              />
              <Skeleton 
                variant="rounded" 
                width={90} 
                height={24} 
                sx={{ 
                  bgcolor: "#2d2d2d",
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                  bgcolor: "#2d2d2d",
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                bgcolor: "#2d2d2d",
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                bgcolor: "#252525",
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                bgcolor: "#2d2d2d",
                '&::after': {
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                  bgcolor: "#2d2d2d",
                  '&::after': {
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                bgcolor: "#1e1e1e"
              }}>
                {/* Editor Header */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  borderBottom: "1px solid #333",
                  bgcolor: "#252525"
                }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton 
                      variant="rounded" 
                      width={100} 
                      height={32} 
                      sx={{ 
                        bgcolor: "#2d2d2d",
                        '&::after': {
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                        }
                      }} 
                    />
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={32} 
                      sx={{ 
                        bgcolor: "#2d2d2d",
                        '&::after': {
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                        bgcolor: "#2d2d2d",
                        '&::after': {
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                        }
                      }} 
                    />
                    <Skeleton 
                      variant="rounded" 
                      width={80} 
                      height={32} 
                      sx={{ 
                        bgcolor: "#2d2d2d",
                        '&::after': {
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                        }
                      }} 
                    />
                  </Box>
                </Box>

                {/* Editor Body */}
                <Box sx={{ flex: 1, p: 2, bgcolor: "#1e1e1e" }}>
                  {[...Array(12)].map((_, i) => (
                    <Skeleton 
                      key={i}
                      variant="text" 
                      width={`${Math.random() * 30 + 60}%`} 
                      height={24} 
                      sx={{ 
                        mb: 0.5,
                        bgcolor: "#2d2d2d",
                        '&::after': {
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                bgcolor: "#1e1e1e"
              }}>
                {/* Testcase Header */}
                <Box sx={{ 
                  display: "flex",
                  gap: 2,
                  p: 2,
                  borderTop: "1px solid #333",
                  borderBottom: "1px solid #333",
                  bgcolor: "#252525"
                }}>
                  {[80, 80, 80].map((width, i) => (
                    <Skeleton 
                      key={i}
                      variant="rounded" 
                      width={width} 
                      height={32} 
                      sx={{ 
                        bgcolor: "#2d2d2d",
                        '&::after': {
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                        }
                      }} 
                    />
                  ))}
                </Box>

                {/* Testcase Body */}
                <Box sx={{ flex: 1, p: 2, bgcolor: "#1e1e1e" }}>
                  <Skeleton 
                    variant="text" 
                    width="20%" 
                    height={24} 
                    sx={{ 
                      mb: 1,
                      bgcolor: "#2d2d2d",
                      '&::after': {
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
                      bgcolor: "#252525",
                      border: "1px solid #333",
                      '&::after': {
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                      }
                    }} 
                  />
                  
                  <Skeleton 
                    variant="text" 
                    width="30%" 
                    height={24} 
                    sx={{ 
                      mb: 1,
                      bgcolor: "#2d2d2d",
                      '&::after': {
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                      }
                    }} 
                  />
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={60} 
                    sx={{ 
                      borderRadius: 1,
                      bgcolor: "#252525",
                      border: "1px solid #333",
                      '&::after': {
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
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
  // const userId = "user_1";

  const showAI = useSelector(state => state.showAIPanel.showAI);

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

          {
            showAI 
              ?
              <>
                {/* resize handle */}
                <HorizontalHandle />

                {/* right */}
                <CodingAssistantSection />
              </> 
              :
              <></>
          }

        </PanelGroup>
    </Box>
  )
}

export default CodeEditorPage