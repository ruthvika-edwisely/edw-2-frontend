import { Box, Paper, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import Description from './components/Description.jsx';
import Editorial from './components/Editorial.jsx';
import Submissions from './components/Submissions.jsx';

const ProblemDescriptionSection = ({problemData, tagsData, hintsData, constraintsData, editorialData}) => {

  const tabLabels = ["Description", "Editorial", "Submissions"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Panel minSize={5}>

      {/* for components having card-like appearance */}
      <Paper
        sx={{
          height: "100%",
          // bgcolor: "grey.1200",
          // color: "white",
          p: 2,
          overflowY: "auto"
        }}
      >
        

        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          // textColor='inherit'
          indicatorColor='primary'
          variant='fullWidth'
          sx={{ borderBottom: "1px solid #444" }}
        >

          {tabLabels.map((tabLabel, idx) =>
            <Tab key={idx} label={tabLabel} />
          )}

        </Tabs>

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 2
          }}
        >

          {activeTab === 0 
              &&
            (<Description 
              problemData={problemData} 
              tagsData={tagsData} 
              hintsData={hintsData} 
              constraintsData={constraintsData} 
            />
          )}

          {activeTab === 1 
              &&
            (<Editorial editorialData={editorialData} />)
          }

          {activeTab === 2 
              &&
            (<Submissions userId={"user_1"} problemId={"prob_1"} />)
          }

        </Box>
        



      </Paper>
    
    
    </Panel>
  )
}

export default ProblemDescriptionSection