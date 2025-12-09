import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Dialog(theme) {
    const color=theme.palette.grey[300]
    return {
        MuiDialog: {
          styleOverrides: {
            paper: {
                '&.MuiDialog-paperSizeLarge': {
                  width: '700px', // Customize the width for large size
                },
                '&.MuiDialog-paperSizeMedium': {
                  width: '616px', // Customize the width for medium size
                },
                '&.MuiDialog-paperSizeSmall': {
                  width: '576px', // Customize the width for small size
                },
               
              },
          },
        },
      };
    }
   