import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import CodeEditorMenu from './components/CodeEditorMenu'
import CodeEditorMain from './components/CodeEditorMain'

const CodeEditor = () => {

  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("python");

  return (
    <Panel>
      <CodeEditorMenu 
          editorTheme={editorTheme} 
          setEditorTheme={setEditorTheme} 
          language={language}
          setLanguage={setLanguage}
        />
        <CodeEditorMain 
          editorTheme={editorTheme}
          language={language} 
        />
    </Panel>
  )
}

export default CodeEditor