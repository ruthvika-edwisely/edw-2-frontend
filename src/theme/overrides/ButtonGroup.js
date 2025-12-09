import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function ButtonGroup(theme) {
    const color=theme.palette.grey[300]
  return {
    MuiButtonGroup: {
      styleOverrides: {
        root: {
           border:`1px solid ${color}`,
           color:`${theme.palette.grey[600]}`,
           fontWeight:300,
           height:43,
           padding:7,
           fontSize:'12px'
        },
           }, 
  }
}
}
