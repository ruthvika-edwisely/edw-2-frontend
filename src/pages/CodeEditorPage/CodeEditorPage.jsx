import { Box, Button, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PanelGroup } from 'react-resizable-panels'
import ProblemDescriptionSection from '../../features/CodeEditorPage/ProblemDescriptionSection/ProblemDescriptionSection.jsx';
import CodeEditorSection from '../../features/CodeEditorPage/CodeEditorSection/CodeEditorSection.jsx';
import CodingAssistantSection from '../../features/CodeEditorPage/CodeAssistantSection/CodingAssistantSection.jsx';
import HorizontalHandle from '../../features/CodeEditorPage/components/HorizontalHandle.jsx';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProblemData } from "../../store/features/problem/problemSlice.js";
import { getUserSubmissionData, getUserProblemSubmissionData } from '../../store/features/submission/submissionSlice.js';
import { togglePanelVisibility } from '../../store/features/showAIPanel/showAISlice.js';
import { getProblemById, getProblemConstraints, getProblemEditorial, getProblemHints, getProblemTags, getProblemTestCases, getSnippetsByProblem } from '../../api/api.js';

const CodeEditorPage = () => {
  
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = "user_1";

  const showAI = useSelector(state => state.showAIPanel.showAI);

  useEffect(() => {
    
    const loadProblemData = async() => {

      try {
        const data = await getProblemById(id);
        const hints = await getProblemHints(id);
        const constraints = await getProblemConstraints(id);
        const snippets = await getSnippetsByProblem(id);
        const editorial = await getProblemEditorial(id);
        const testcases = await getProblemTestCases(id);
        const tags = await getProblemTags(id);

        console.log(data);
        console.log(tags);
        
        dispatch(getProblemData({id, data, hints, constraints, snippets, editorial, testcases, tags}));
      }
      finally {
        setLoading(false);
      }
    }
    loadProblemData();


    // data sotre cheste -> dispatch , ikkada id store chestunna, so dispatch
    dispatch(getUserSubmissionData(userId));
    dispatch(getUserProblemSubmissionData({userId, id}));


  }, [userId, id]);



  if(loading) {
    return (
      <Box 
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      < CircularProgress size={60} />
      </Box>
    )
  }



  return (
    <Box sx={{display: "flex", flexDirection: "column", height: "100%", width: "100%", 
    // bgcolor: "grey.1200"
    }}>

        {/* AI Toggle Button */}
        <Box sx={{
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center",
                  width: "100%", 
                  height: "65px", 
                  paddingX: "8px", 
                  paddingY: "16px",
                  border: "1px solid",
                  borderColor: "grey.1300"
                }}
        >
          <Button variant='contained' onClick={() => dispatch(togglePanelVisibility())}>
            {showAI ? "Close" : "Ask AI"}
          </Button>
        </Box>



        {/* Horizontal Panels - 3 unnay (1 closable) */}
        <PanelGroup direction='horizontal'>

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