import React from 'react'
import { PanelResizeHandle } from 'react-resizable-panels'
import { styled } from '@mui/material'

const StyledResizeHandle = styled(PanelResizeHandle)(({ theme, styles }) => ({
  width: styles?.width,
  height: styles?.height,
  background: styles.bg,
  borderRadius: styles.borderRadius,
  transition: styles.transition,

  "&:hover": {
    background: theme.palette.additionalColorPalette.resizeHandleHover,
    cursor: styles.cursor,
  },
}));

const ResizeHandle = (props) => {
  return <StyledResizeHandle styles={props} />
};

export default ResizeHandle;