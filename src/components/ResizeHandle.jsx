import React from "react";
import { PanelResizeHandle } from "react-resizable-panels";
import { styled } from "@mui/material/styles";

const StyledResizeHandle = styled(PanelResizeHandle, {
  shouldForwardProp: (prop) => prop !== "ownerState",
})(({ theme, ownerState }) => {
  const problemPagePalette =
    theme.palette.mode === "dark"
      ? theme.palette.PROBLEMPAGEDARK
      : theme.palette.PROBLEMPAGELIGHT;

  if (!problemPagePalette) return {};

  return {
    width: ownerState.width,
    height: ownerState.height,
    background: problemPagePalette.resizeHandle,
    borderRadius: ownerState.borderRadius,
    transition: ownerState.transition,
    cursor: ownerState.cursor,

    "&:hover": {
      background: problemPagePalette.resizeHandleHover,
    },
  };
});

const ResizeHandle = (props) => {
  return <StyledResizeHandle ownerState={props} />;
};

export default ResizeHandle;
