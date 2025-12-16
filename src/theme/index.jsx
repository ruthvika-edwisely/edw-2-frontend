import PropTypes from "prop-types";
import { useMemo } from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";

import GlobalStyles from "./globalstyles";
import componentsOverride from "./overrides";
import typography from "./typography";
import getPalette from "./palette"; // 🔥 FUNCTION now

ThemeProvider.propTypes = {
  children: PropTypes.node,
  mode: PropTypes.oneOf(["light", "dark"]).isRequired,
};

export default function ThemeProvider({ children, mode }) {
  const theme = useMemo(() => {
    const breakpoints = {
      values: {
        xs: 0,
        xs200to400: 201,
        sm: 401,
        md: 601,
        lg: 901,
        xl: 1201,
        xxl: 1537,
      },
    };

    const themeOptions = {
      palette: getPalette(mode), // 🔥 HERE
      shape: { borderRadius: 6 },
      typography,
      breakpoints,
      components: {
        MuiTypography: {
          defaultProps: {
            variant: "body1",
          },
        },
        MuiInputBase: {
          styleOverrides: {
            input: typography.body1,
            inputPlaceholder: {
              ...typography.body1,
              opacity: 1,
            },
          },
        },
        MuiTextField: {
          defaultProps: {
            InputProps: {
              disableUnderline: true,
            },
          },
        },
        MuiAutocomplete: {
          styleOverrides: {
            inputRoot: typography.body1,
            listbox: typography.body1,
          },
        },
        MuiSelect: {
          styleOverrides: {
            select: typography.body1,
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              ...typography.body1,
              textTransform: "none",
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: typography.body1,
          },
        },
      },
    };

    const theme = createTheme(themeOptions);

    theme.components = {
      ...theme.components,
      ...componentsOverride(theme),
      MuiTypography: {
        defaultProps: {
          variant: "body1",
        },
      },
    };

    return theme;
  }, [mode]); // 🔥 IMPORTANT

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      {children}
    </MUIThemeProvider>
  );
}
