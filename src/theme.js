import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C3E2D',
      light: '#4A6741',
      dark: '#1A2418',
    },
    secondary: {
      main: '#C4A46B',
      light: '#D4BA8E',
      dark: '#A68848',
    },
    background: {
      default: '#F7F4EF',
      paper: '#FFFFFF',
    },
    error: {
      main: '#B5453A',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#5C5C5C',
    },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h1: {
      fontFamily: "'DM Serif Display', serif",
    },
    h2: {
      fontFamily: "'DM Serif Display', serif",
    },
    h3: {
      fontFamily: "'DM Serif Display', serif",
    },
    h4: {
      fontFamily: "'DM Serif Display', serif",
    },
    h5: {
      fontFamily: "'DM Serif Display', serif",
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.02em',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-head': {
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            color: '#5C5C5C',
          },
        },
      },
    },
  },
});
