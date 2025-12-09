import React from 'react'
import ResizeHandle from '../../../components/ResizeHandle.jsx'

const VerticalHandle = () => {
  return (
    <ResizeHandle 
        width={"100%"}
        height={5}
        bg={"#333333"}
        borderRadius={0}
        transition={"background 0.1s ease"}
        cursor={"row-resize"}
    />
  )
}

export default VerticalHandle;