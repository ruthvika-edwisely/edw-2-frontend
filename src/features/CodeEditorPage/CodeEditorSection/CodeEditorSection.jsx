import React from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import CodeEditor from "./components/CodeEditor/CodeEditor.jsx";
import TestcasesBlock from './components/TestcasesBlock.jsx';
import VerticalHandle from "../components/VerticalHandle.jsx";

const CodeEditorSection = ({snippetsData, testcases}) => {
  return (
    <Panel minSize={5}>
      <PanelGroup direction='vertical'>
        <CodeEditor snippetsData={snippetsData} />

        <VerticalHandle />

        <TestcasesBlock testcases={testcases} />
      </PanelGroup>
    </Panel>
  )
}

export default CodeEditorSection