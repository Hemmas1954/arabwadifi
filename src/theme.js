import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B4E65', // لون أزرق داكن أنيق
      light: '#2E6A84',
      dark: '#0F3547',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#D4A574', // لون ذهبي دافئ
      light: '#E1B886',
      dark: '#B8935F',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#28A745', // لون أخضر للنجاح
      light: '#5CB85C',
      dark: '#1E7E34',
    },
    warning: {
      main: '#FFC107', // لون أصفر للتحذير
      light: '#FFD54F',
      dark: '#FF8F00',
    },
    error: {
      main: '#DC3545', // لون أحمر للأخطاء
      light: '#E57373',
      dark: '#C62828',
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
      overlay: 'rgba(0, 0, 0, 0.6)',
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5A6C7D',
      white: '#FFFFFF',
      light: '#ECF0F1',
    },
  },
  typography: {
    fontFamily: [
      '"Tajawal"',
      '"Amiri"',
      '"Cairo"',
      '"Noto Sans Arabic"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 2px 4px rgba(0,0,0,0.1)',
    '0px 4px 8px rgba(0,0,0,0.12)',
    '0px 6px 16px rgba(0,0,0,0.15)',
    '0px 8px 24px rgba(0,0,0,0.18)',
    '0px 12px 32px rgba(0,0,0,0.2)',
    // المزيد من الظلال...
  ],
});

export default theme;