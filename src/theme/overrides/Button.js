import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
            boxShadow: 'none',
            // padding:0,
            '&$active': {
              // Customize the styles for the active state
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
             
            },
           
            
        },
        hover: {
          backgroundColor: 'transparent',
          // Your styles for the hover class here
        },
        sizeLarge: {
          height: 45,
          // width:170
        },
        sizeMedium: {
          height: 35, // Customize the height for medium size
          // width: 130, // Customize the width for medium size
        },
        sizeSmall: {
          height:30,
          // width:80
        },
      
        containedInherit: {
          color: 'rgb(220 48 48)',
          // boxShadow: theme.customShadows.z8,
        //   '&:hover': {
        //     backgroundColor: theme.palette.grey[400],
        //   },
          '&$disabled': {
            backgroundColor: theme.palette.action.disabled, // Customize the background color for the disabled state
            color: theme.palette.grey[800], // Customize the text color for the disabled state
          },
        },
        containedPrimary: {
          // boxShadow: theme.customShadows.primary,
          backgroundColor: theme.palette.primary.main,
          '&$hover': {
            backgroundColor: theme.palette.primary.dark,
           
          },
        },
        containedSecondary: {
          // boxShadow: theme.customShadows.secondary,
          backgroundColor: theme.palette.secondary.main,
          '&:hover': {
            backgroundColor: theme.palette.secondary.darker,
           
          },
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.primary[700]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
