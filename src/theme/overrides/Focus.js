// Focus.js
export default function Focus(theme) {
    const lightGrey = "#d3d3d3"; // subtle light grey border
  
    return {
      MuiButtonBase: {
        styleOverrides: {
          root: {
            "&:focus-visible": {
              outline: `2px solid ${lightGrey}`,
              boxShadow: "none",
            },
          },
        },
      },
  
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: lightGrey,
            },
          },
        },
      },
  
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&:focus-visible": {
              outline: `2px solid ${lightGrey}`,
            },
          },
        },
      },
  
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: `1px solid ${lightGrey}`,
            },
            "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
              outline: `1px solid ${lightGrey}`,
            },
          },
        },
      },
  
      MuiToggleButton: {
        styleOverrides: {
          root: {
            "&.Mui-focusVisible": {
              outline: `2px solid ${lightGrey}`, // subtle focus for toggle
              boxShadow: "none",
            },
          },
        },
      },
    };
  }
  