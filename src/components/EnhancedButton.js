import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  primaryButton: {
    background: 'linear-gradient(135deg, #28A745 0%, #34CE57 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(2, 4),
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 16px rgba(40, 167, 69, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 180,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 6px 20px rgba(40, 167, 69, 0.5)',
      background: 'linear-gradient(135deg, #34CE57 0%, #28A745 100%)',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(1.02)',
    },
    '&:disabled': {
      background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  secondaryButton: {
    background: 'linear-gradient(135deg, #D4A574 0%, #B8935F 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(1.5, 3),
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 16px rgba(212, 165, 116, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 160,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 6px 20px rgba(212, 165, 116, 0.5)',
      background: 'linear-gradient(135deg, #B8935F 0%, #D4A574 100%)',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(1.02)',
    },
    '&:disabled': {
      background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  dangerButton: {
    background: 'linear-gradient(135deg, #DC3545 0%, #C62828 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(1.5, 3),
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 4px 16px rgba(220, 53, 69, 0.4)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 160,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 6px 20px rgba(220, 53, 69, 0.5)',
      background: 'linear-gradient(135deg, #C62828 0%, #DC3545 100%)',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(1.02)',
    },
    '&:disabled': {
      background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
      transform: 'none',
      boxShadow: 'none',
    },
  },
  outlineButton: {
    background: 'transparent',
    border: '2px solid rgba(255, 255, 255, 0.8)',
    borderRadius: 50,
    padding: theme.spacing(1.5, 3),
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 160,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'white',
      transform: 'translateY(-2px) scale(1.05)',
      boxShadow: '0 4px 16px rgba(255, 255, 255, 0.2)',
    },
    '&:active': {
      transform: 'translateY(-1px) scale(1.02)',
    },
  },
}));

const EnhancedButton = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled = false, 
  startIcon,
  size = 'medium',
  ...props 
}) => {
  const classes = useStyles();

  const getButtonClass = () => {
    switch (variant) {
      case 'secondary':
        return classes.secondaryButton;
      case 'danger':
        return classes.dangerButton;
      case 'outline':
        return classes.outlineButton;
      case 'primary':
      default:
        return classes.primaryButton;
    }
  };

  return (
    <Button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
      size={size}
      {...props}
    >
      {children}
    </Button>
  );
};

export default EnhancedButton;