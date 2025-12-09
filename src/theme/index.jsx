import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from './globalstyles';
import componentsOverride from './overrides';
import typography from './typography';
import palette from './palette';


ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const themeOptions = useMemo(() => {
    const breakpoints =  {
      values: {
          xs: 0,          // 0 - 200
          xs200to400: 201, // 201 - 400
          sm: 401,        // 401 - 600
          md: 601,        // 601 - 900
          lg: 901,        // 901 - 1200
          xl: 1201,       // 1201 - 1536
          xxl: 1537,      // > 1536
      },
    }
    return {
    palette: palette,
    shape: { borderRadius: 6 },
    typography: typography,
    breakpoints:breakpoints,
    components: {
        MuiTypography: {
        defaultProps: {
            variant: 'body1', // Set the default variant to body1
        },
        },
        MuiInputBase: {
        styleOverrides: {
            input: {
            ...typography.body1, // Apply body1 styles to input text
            },
            inputPlaceholder: {
            ...typography.body1, // Apply body1 styles to placeholders
            opacity: 1, // Ensure placeholder text is visible
            },
        },
        },
        MuiTextField: {
        defaultProps: {
            InputProps: {
            disableUnderline: true, // Optional: Disable underline for TextField
            },
        },
        },
        MuiAutocomplete: {
        styleOverrides: {
            inputRoot: {
            ...typography.body1, // Apply body1 styles to the root input
            },
            listbox: {
            ...typography.body1, // Apply body1 styles to dropdown options
            },
        },
        },
        MuiSelect: {
        styleOverrides: {
            select: {
            ...typography.body1, // Apply body1 styles to select text
            },
        },
        },
        MuiButton: {
        styleOverrides: {
            root: {
            ...typography.body1, // Apply body1 styles to button text
            textTransform: 'none', // Optional: Disable uppercase transformation
            },
        },
        },
        MuiMenuItem: {
        styleOverrides: {
            root: {
            ...typography.body1, // Apply body1 styles to menu items
            },
        },
        },
    },
    };
  }, []);

  const theme = createTheme(themeOptions);
  theme.components = {
    ...theme.components, // Retain existing components
    ...componentsOverride(theme), // Apply overrides
    MuiTypography: {
      defaultProps: {
        variant: 'body1', // Ensure this is retained
      },
    },
  };   

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
