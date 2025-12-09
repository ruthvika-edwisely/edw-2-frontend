// ----------------------------------------------------------------------

export default function Card(theme) {
    return {
      MuiCard: {
        styleOverrides: {
          root: {
            position: 'relative',
            zIndex: 0, // Fix Safari overflow: hidden with border radius
            backgroundColor: 'white',
            padding: '10px',
            margin: '20px auto',
            borderRadius: '8px',
            // boxShadow: theme.customShadows.primary,
          },

        },
      },
      MuiCardHeader: {
        defaultProps: {
          titleTypographyProps: { variant: 'h6' },
          subheaderTypographyProps: { variant: 'body2' },
        },
        styleOverrides: {
          root: {
            padding: "3px",
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            paddingBottom: "0px",
          },
        },
      },
    };
  }
  