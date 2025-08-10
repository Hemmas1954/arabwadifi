import React from 'react';
import { makeStyles, CircularProgress, Typography, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(4),
    minHeight: 200,
  },
  spinner: {
    color: '#28A745',
    marginBottom: theme.spacing(2),
  },
  loadingText: {
    color: '#FFFFFF',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontSize: '1.1rem',
    fontWeight: 500,
    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
  },
  pulseEffect: {
    animation: '$pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.6,
    },
    '100%': {
      opacity: 1,
    },
  },
}));

const LoadingSpinner = ({ text = 'جاري التحميل...', size = 60 }) => {
  const classes = useStyles();

  return (
    <div className={classes.loadingContainer}>
      <CircularProgress 
        className={classes.spinner} 
        size={size}
        thickness={4}
      />
      <Typography 
        variant="body1" 
        className={`${classes.loadingText} ${classes.pulseEffect}`}
        dir="rtl"
      >
        {text}
      </Typography>
    </div>
  );
};

export default LoadingSpinner;