import React from 'react'
import { Panel, PanelGroup } from 'react-resizable-panels'
import CodeEditor from "./components/CodeEditor/CodeEditor.jsx";
import TestcasesBlock from './components/TestcasesBlock.jsx';
import VerticalHandle from "../components/VerticalHandle.jsx";

const CodeEditorSection = () => {
  return (
    <Panel minSize={5}>
      <PanelGroup direction='vertical'>
        <CodeEditor />

        <VerticalHandle />

        <TestcasesBlock />
      </PanelGroup>
    </Panel>
  )
}

export default CodeEditorSection