import React from "react";
import { PanelResizeHandle } from "react-resizable-panels";
import { styled } from "@mui/material/styles";

const StyledResizeHandle = styled(PanelResizeHandle, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})(({ theme, ownerState }) => {
  const resizeHandleHover = theme.palette.additionalColors?.editor?.resizeHandleHover;

  return {
    width: ownerState.width || 5,
    height: ownerState.height || "100%",
    background: ownerState.bg || theme.palette.grey[1300],
    borderRadius: ownerState.borderRadius || 0,
    transition: ownerState.transition || "background 0.2s",
    cursor: ownerState.cursor || "col-resize",
    flexShrink: 0,

    "&:hover": {
      background: ownerState.bgHover || resizeHandleHover || "#1d7bd6",
    },
  };
});

const ResizeHandle = (props) => {
  return <StyledResizeHandle ownerState={props} />;
};

export default ResizeHandle;