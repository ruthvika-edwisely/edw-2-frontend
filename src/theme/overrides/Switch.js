import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Switch(theme) {
    const color=theme.palette.grey[300]
    const pxToRem = (px, oneRemPx = 16) => `${px / oneRemPx}rem`;
  const spacing = 8;
  const size = pxToRem(25);
  const width = pxToRem(52 + 2 * spacing);
  const borderWidth = 2;
  const height = `calc(${size} + ${borderWidth * 2}px + ${pxToRem(2 * spacing)})`;
  return {
    MuiSwitch: {
        styleOverrides: {
            root: {
                padding: 7,
                marginTop:'0.4rem',
              },
              thumb: {
                width: 15,
                height: 15,
                backgroundColor: '#fff',
                boxShadow:
                  '0 0 12px 0 rgba(0,0,0,0.08), 0 0 8px 0 rgba(0,0,0,0.12), 0 0 4px 0 rgba(0,0,0,0.38)',
              },
              switchBase: {
                color: 'rgba(0,0,0,0.38)',
                padding: 7,
              },
              track: {
                height: '65%',
                width: '75%',
                borderRadius: 20,
                backgroundColor: theme.palette.grey[500],
              
              },
          
        },
      },
    };
}

