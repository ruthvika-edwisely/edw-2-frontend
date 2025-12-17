import React from 'react'
import ResizeHandle from '../../../components/ResizeHandle.jsx'

const HorizontalHandle = () => {
  return (
    <ResizeHandle 
        width={5}
        height={"100%"}
        bg={"#333333"}
        borderRadius={50}
        transition={"background 0.1s ease"}
        cursor={"col-resize"}
    />
  )
}

export default HorizontalHandle