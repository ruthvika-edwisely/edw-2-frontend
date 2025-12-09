import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function TextField(theme) {
  const color = theme.palette.grey[200]
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          border: `1px solid ${color}`,
          
          sizeLarge: {
            // width:525,
            height: 45,
          },
          sizeMedium: {
            // width:425,
            height: 30,
          },
          sizeSmall: {
            // width:425,
            height: 18,
          }
        },
      },
    }
  }
}
