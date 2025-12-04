import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PanelGroup } from 'react-resizable-panels'
import ProblemDescriptionSection from '../../features/CodeEditorPage/ProblemDescriptionSection/ProblemDescriptionSection.jsx';
import CodeEditorSection from '../../features/CodeEditorPage/CodeEditorSection/CodeEditorSection.jsx';
import CodingAssistantSection from '../../features/CodeEditorPage/CodeAssistantSection/CodingAssistantSection.jsx';
import HorizontalHandle from '../../features/CodeEditorPage/components/HorizontalHandle.jsx';
import { getProblemById, getProblemConstraints, getProblemEditorial, getProblemHints, getProblemTags, getProblemTestCases, getSnippetsByProblem } from '../../api/api.js';
import { useParams } from 'react-router-dom';


const CodeEditorPage = () => {
  
  const { id } = useParams();
  const [showAI, setShowAI] = useState(false);
  const [problemData, setProblemData] = useState({});
  const [tagsData, setTagsData] = useState([]);
  const [hintsData, setHintsData] = useState([]);
  const [constraintsData, setConstraintsData] = useState([]);
  const [editorialData, setEditorialData] = useState({});
  const [snippetsData, setSnippetsData] = useState([]);
  const [testcases, setTestcases] = useState([]);

  useEffect(() => {
    const problem = getProblemById(id);
    const tags = getProblemTags(id);
    const hints = getProblemHints(id);
    const constraints = getProblemConstraints(id);
    const editorial = getProblemEditorial(id);
    const snippets = getSnippetsByProblem(id);
    const tcs = getProblemTestCases(id);

    setProblemData(problem);
    setTagsData(tags);
    setHintsData(hints);
    setConstraintsData(constraints);
    setEditorialData(editorial);
    setSnippetsData(snippets);
    setTestcases(tcs);
  }, [id]);



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
          <Button variant='contained' onClick={() => setShowAI(!showAI)}>
            {showAI ? "Close" : "Ask AI"}
          </Button>
        </Box>



        {/* Horizontal Panels - 3 unnay (1 closable) */}
        <PanelGroup direction='horizontal'>

          {/* left */}
          <ProblemDescriptionSection problemData={problemData} tagsData={tagsData} hintsData={hintsData} constraintsData={constraintsData} editorialData={editorialData} />

          {/* resize handle */}
          <HorizontalHandle />

          {/* center */}
          <CodeEditorSection snippetsData={snippetsData} testcases={testcases} />

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