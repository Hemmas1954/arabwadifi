import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Fade, Typography } from '@material-ui/core';
import usePageLoad from '../hooks/usePageLoad';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    fontFamily: '"Tajawal", "Cairo", "Noto Sans Arabic", sans-serif',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 50%, #D4A574 100%)',
    color: '#FFFFFF',
    flexDirection: 'column',
    gap: theme.spacing(3),
    padding: theme.spacing(2),
  },
  loadingSpinner: {
    color: '#FFD700',
    filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.3))',
  },
  loadingText: {
    fontSize: '1.3rem',
    fontWeight: 600,
    fontFamily: '"Tajawal", "Cairo", "Noto Sans Arabic", sans-serif',
    textAlign: 'center',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    maxWidth: '80%',
    lineHeight: 1.5,
  },
  loadingSubtext: {
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: '"Tajawal", "Cairo", "Noto Sans Arabic", sans-serif',
    textAlign: 'center',
    opacity: 0.8,
    marginTop: theme.spacing(1),
  },
  content: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '50%': {
      transform: 'scale(1.05)',
      opacity: 0.8,
    },
    '100%': {
      transform: 'scale(1)',
      opacity: 1,
    },
  },
  pulseEffect: {
    animation: '$pulse 2s ease-in-out infinite',
  },
}));

const PageWrapper = ({ children, loadingText = "جاري التحميل...", subText = "يرجى الانتظار قليلاً" }) => {
  const classes = useStyles();
  const isLoaded = usePageLoad(200); // تقليل التأخير لأن التحميل يتم في index.html

  if (!isLoaded) {
    return (
      <Box className={classes.loadingContainer}>
        <Box className={classes.pulseEffect}>
          <CircularProgress 
            size={70} 
            thickness={4}
            className={classes.loadingSpinner}
          />
        </Box>
        <Typography className={classes.loadingText} dir="rtl">
          {loadingText}
        </Typography>
        <Typography className={classes.loadingSubtext} dir="rtl">
          {subText}
        </Typography>
      </Box>
    );
  }

  return (
    <Fade in={isLoaded} timeout={600}>
      <Box className={classes.wrapper}>
        <Box className={classes.content}>
          {children}
        </Box>
      </Box>
    </Fade>
  );
};

export default PageWrapper;