export default function Focus(theme) {
    return {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&:focus-visible": {
              outline: "none",
              boxShadow: "none",
            },
          },
        },
      },
  
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          },
        },
      },
  
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&:focus-visible": {
              outline: "none",
            },
          },
        },
      },
  
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
              outline: "none",
            },
          },
        },
      },
    };
  }
  