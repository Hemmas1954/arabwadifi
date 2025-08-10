import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Fade, Slide } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  snackbarContainer: {
    position: 'fixed',
    top: theme.spacing(2),
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: theme.zIndex.snackbar,
    maxWidth: '90%',
    minWidth: 300,
  },
  snackbar: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 3),
    borderRadius: 12,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    minHeight: 56,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
  },
  success: {
    background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.95) 0%, rgba(32, 201, 151, 0.9) 100%)',
    color: '#FFFFFF',
    '& .MuiSvgIcon-root': {
      color: '#FFFFFF',
    },
  },
  error: {
    background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.95) 0%, rgba(231, 76, 60, 0.9) 100%)',
    color: '#FFFFFF',
    '& .MuiSvgIcon-root': {
      color: '#FFFFFF',
    },
  },
  warning: {
    background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.95) 0%, rgba(255, 165, 0, 0.9) 100%)',
    color: '#FFFFFF',
    '& .MuiSvgIcon-root': {
      color: '#FFFFFF',
    },
  },
  info: {
    background: 'linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 100%)',
    color: '#FFFFFF',
    '& .MuiSvgIcon-root': {
      color: '#FFFFFF',
    },
  },
  icon: {
    marginLeft: theme.spacing(2),
    fontSize: '1.5rem',
    filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
  },
  message: {
    flex: 1,
    fontSize: '1rem',
    fontWeight: 500,
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    direction: 'rtl',
    textAlign: 'right',
  },
  closeButton: {
    marginRight: theme.spacing(1),
    padding: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  closeIcon: {
    fontSize: '1.2rem',
  },
  '@keyframes slideInDown': {
    from: {
      opacity: 0,
      transform: 'translateX(-50%) translateY(-100%)',
    },
    to: {
      opacity: 1,
      transform: 'translateX(-50%) translateY(0)',
    },
  },
  '@keyframes slideOutUp': {
    from: {
      opacity: 1,
      transform: 'translateX(-50%) translateY(0)',
    },
    to: {
      opacity: 0,
      transform: 'translateX(-50%) translateY(-100%)',
    },
  },
  slideIn: {
    animation: '$slideInDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  slideOut: {
    animation: '$slideOutUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));

const getIcon = (severity) => {
  switch (severity) {
    case 'success':
      return <CheckCircleIcon />;
    case 'error':
      return <ErrorIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'info':
    default:
      return <InfoIcon />;
  }
};

const Snackbar = ({ 
  message, 
  open, 
  handleClose, 
  severity = 'info', 
  duration = 4000,
  position = 'top-center' 
}) => {
  const classes = useStyles();
  const [isVisible, setIsVisible] = useState(open);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsAnimating(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleCloseSnackbar();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    }
  }, [open, duration]);

  const handleCloseSnackbar = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      if (handleClose) {
        handleClose();
      }
    }, 400);
  };

  if (!isVisible && !open) return null;

  const severityClass = classes[severity] || classes.info;
  const animationClass = isAnimating ? classes.slideIn : classes.slideOut;

  return (
    <div className={classes.snackbarContainer}>
      <Fade in={open} timeout={400}>
        <div className={`${classes.snackbar} ${severityClass} ${animationClass}`}>
          <div className={classes.icon}>
            {getIcon(severity)}
          </div>
          
          <Typography className={classes.message} dir="rtl">
            {message}
          </Typography>
          
          <IconButton
            className={classes.closeButton}
            onClick={handleCloseSnackbar}
            size="small"
          >
            <CloseIcon className={classes.closeIcon} />
          </IconButton>
        </div>
      </Fade>
    </div>
  );
};

// مكون محسن مع خصائص إضافية
export const EnhancedSnackbar = ({ 
  message, 
  open, 
  onClose, 
  severity = 'info',
  duration = 4000,
  position = 'top-center',
  action = null,
  persistent = false
}) => {
  const classes = useStyles();
  const [internalOpen, setInternalOpen] = useState(open);

  useEffect(() => {
    setInternalOpen(open);
  }, [open]);

  useEffect(() => {
    if (internalOpen && !persistent && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [internalOpen, duration, persistent]);

  const handleClose = () => {
    setInternalOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar
      message={message}
      open={internalOpen}
      handleClose={handleClose}
      severity={severity}
      duration={persistent ? 0 : duration}
      position={position}
    />
  );
};

export default Snackbar;