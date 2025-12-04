import { Editor } from '@monaco-editor/react'
import { Box } from '@mui/material'
import React from 'react'
import { getAllLanguages } from '../../../../../../api/api.js';

const CodeEditorMain = ({editorTheme, language, snippetsData}) => {
  
  const langs = getAllLanguages();
  const langObj = langs.find((lang) => lang.name.toLowerCase() === language.toLowerCase());
  const langId = langObj?.id;

  const snippet = snippetsData.find((s) => s.languageId === langId);
  const code = snippet?.code ?? "";

  return (
    <Box sx={{height: "100%"}}>
        <Editor 
            height={"100%"}
            language={language}
            theme={editorTheme}
            value={code}
        />
    </Box>
  )
}

export default CodeEditorMain