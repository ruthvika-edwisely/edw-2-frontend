import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import CodeEditorMenu from './components/CodeEditorMenu'
import CodeEditorMain from './components/CodeEditorMain'

const CodeEditor = ({snippetsData, testcases}) => {

  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("python");

  return (
    <Panel>

      <Box sx={{display: "flex", flexDirection: "column", height: "100%", 
        // bgcolor: "grey.1300"
        }}>
        
        <CodeEditorMenu 
          editorTheme={editorTheme} 
          setEditorTheme={setEditorTheme} 
          language={language}
          setLanguage={setLanguage}
        />
        <CodeEditorMain 
          editorTheme={editorTheme}
          language={language} 
          snippetsData={snippetsData}
        />

      </Box>

    </Panel>
  )
}

export default CodeEditor