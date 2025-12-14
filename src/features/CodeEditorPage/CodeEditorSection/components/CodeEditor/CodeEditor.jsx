import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import CodeEditorMenu from './components/CodeEditorMenu'
import CodeEditorMain from './components/CodeEditorMain'
import { useDispatch, useSelector } from 'react-redux'
import { submitCode } from '../../../../../api/api.js';
import { getTestcaseResults, getLatestSubmissionData } from "../../../../../store/features/submission/submissionSlice.js";



const CodeEditor = () => {

  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("python");
  const [runCode, setRunCode] = useState(false);
  const [submitCodeFlag, setSubmitCodeFlag] = useState(false);
  const problemId = useSelector(state => state.problem.id);
  const dispatch = useDispatch();

  const runCodeExecution = async(mode) => {
    const source_code = localStorage.getItem(`code-problem-${problemId}-${language.toLowerCase()}`)
    const language_name = language.toLowerCase();
    
    const submissionResponse = await submitCode({
      "problem_id": problemId,
      "source_code": source_code,
      "language_name": language_name,
      "mode": mode
    });

    console.log("submission response : ", submissionResponse.testcase_results);

    
    if(mode == "Run") {

      const data = submissionResponse.testcase_results;
      console.log('checking again : ', data);
      dispatch(getTestcaseResults(data));
    
    }
    
    else if(mode == "Submit") {
      dispatch(getLatestSubmissionData(submissionResponse));
    }

  };


  const afterRunCodeClick = async(mode) => {
    try {

      if(mode == "Run")
        setRunCode(true);

      else if(mode == "Submit")
          setSubmitCodeFlag(true);

      await runCodeExecution(mode);
    }
    catch(error) {
      console.log("Run code error :", error);
    }
    finally {
      setRunCode(false);
      setSubmitCodeFlag(false);
    }
  };


  return (
    <Panel>
      <CodeEditorMenu 
          editorTheme={editorTheme} 
          setEditorTheme={setEditorTheme} 
          language={language}
          setLanguage={setLanguage}
          runCode={runCode}
          submitCode={submitCodeFlag}
          afterRunCodeClick={afterRunCodeClick}
        />
        <CodeEditorMain 
          editorTheme={editorTheme}
          language={language} 
        />
    </Panel>
  )
}

export default CodeEditor