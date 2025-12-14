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
import { togglePanelVisibility } from '../../store/features/showAIPanel/showAISlice.js';
import { getProblemById } from '../../api/api.js';

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

        console.log(data);
        
        dispatch(getProblemData({id, data}));
      }
      finally {
        setLoading(false);
      }
    }
    loadProblemData();


    // data sotre cheste -> dispatch , ikkada id store chestunna, so dispatch


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