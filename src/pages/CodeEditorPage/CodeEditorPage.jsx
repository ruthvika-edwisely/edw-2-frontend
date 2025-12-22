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
import { togglePanelVisibility } from '../../store/reducers/showAIReducer.js';
import { getProblemById } from '../../api/api.js';
import { getLatestSubmissionData, getTestcaseResults } from '../../store/features/submission/submissionSlice.js';
import { useTheme } from '@mui/material/styles';
import CodeEditorPageSkeleton from "../../features/CodeEditorPage/components/CodeEditorPageSkeleton.jsx"

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