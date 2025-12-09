import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Chip(theme) {
    const color=theme.palette.grey[300]
  return {
    MuiChip: {
      styleOverrides: {
        root: {
            borderRadius: '4px',
        },
        colorPrimary: {
         color:`${theme.palette.primary.main}`,
         background:`${theme.palette.secondary.lighter}`,
        },
        colorSecondary: {
         color:`${theme.palette.success.main}`,
         background:`${theme.palette.secondary.lighter}`,
         },

           }, 
  }
}
}
