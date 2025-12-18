import { Box, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { Panel } from 'react-resizable-panels'
import CodeEditorMenu from './components/CodeEditorMenu'
import CodeEditorMain from './components/CodeEditorMain'
import { useDispatch, useSelector } from 'react-redux'
import { submitCode } from '../../../../../api/api.js';
import { getTestcaseResults, getLatestSubmissionData, getRunStatus, getSubmitStatus } from "../../../../../store/features/submission/submissionSlice.js";
import { updateTabIndex } from '../../../../../store/features/activeTabSlice.js'



const CodeEditor = () => {

  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("python");
  const runCode = useSelector(state => state.submissions.runCode);
  const submitCodeFlag = useSelector(state => state.submissions.submitCodeFlag);
  const problemId = useSelector(state => state.problem.id);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [isDefault, setIsDefault] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const userId = user?.id;

  const runCodeExecution = async(mode) => {
    const source_code = localStorage.getItem(`code-user-${userId}-problem-${problemId}-${language.toLowerCase()}`)

    if(!source_code || source_code.trim() == "") {
      setSnackBarOpen(true);
      return;
    }

    const language_name = language.toLowerCase();
    
    const submissionResponse = await submitCode({
      "problem_id": problemId,
      "source_code": source_code,
      "language_name": language_name,
      "mode": mode
    });

    console.log("submission response : ", submissionResponse);

    
    if(mode == "Run") {

      const data = submissionResponse.testcase_results;
      console.log('checking again : ', data);
      dispatch(getTestcaseResults(data));
      dispatch(getLatestSubmissionData(submissionResponse));
    
    }
    
    else if(mode == "Submit") {
      dispatch(getLatestSubmissionData(submissionResponse));
    }

  };


  const afterRunCodeClick = async(mode) => {
    try {

      dispatch(getTestcaseResults(null));
      if(mode == "Run") {
        dispatch(getRunStatus(true));
      }

      else if(mode == "Submit") {
          dispatch(getSubmitStatus(true));
      }

      await runCodeExecution(mode);
    }
    catch(error) {
      console.log("Run code error :", error);
    }
    finally {
      dispatch(getRunStatus(false));
      dispatch(getSubmitStatus(false));
      dispatch(updateTabIndex(2));
    }
  };


  return (
    <Panel>
      <CodeEditorMenu 
          editorTheme={editorTheme} 
          setEditorTheme={setEditorTheme} 
          language={language}
          setLanguage={setLanguage}
          afterRunCodeClick={afterRunCodeClick}
          setIsDefault={setIsDefault}
        />
        <CodeEditorMain 
          editorTheme={editorTheme}
          language={language} 
          isDefault={isDefault}
          setIsDefault={setIsDefault}
        />

        <Snackbar
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackBarOpen(false)}
          message="Type something to Run / Submit"
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        />


    </Panel>
  )
}

export default CodeEditor