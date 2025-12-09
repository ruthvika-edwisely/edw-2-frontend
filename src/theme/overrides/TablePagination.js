import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function TablePagination() {
  return {
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
         alignItems:'baseline',

        },
        selectLabel: {
          display: 'none',
        },
        selectRoot: {
          display: 'none',
        },
      },
    },
  };
}
