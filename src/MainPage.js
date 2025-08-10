import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { emailConfig } from './emailConfig';
import { 
    makeStyles, 
    Grid, 
    Typography, 
    IconButton, 
    Button, 
    Container, 
    Card, 
    CardContent, 
    CardMedia, 
    Fade,
    Box,
    Grow,
    Zoom,
    Chip,
    Avatar,
    LinearProgress,
    Divider,
    Tooltip,

} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import BarChartIcon from '@material-ui/icons/BarChart';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import HelpIcon from '@material-ui/icons/Help';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SpeedIcon from '@material-ui/icons/Speed';
import SchoolIcon from '@material-ui/icons/School';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import EmailIcon from '@material-ui/icons/Email';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import FeedbackIcon from '@material-ui/icons/Feedback';
import BugReportIcon from '@material-ui/icons/BugReport';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import MainpageImage from './images1.PNG';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  mainPage: {
    backgroundImage: `
      radial-gradient(circle at 25% 75%, rgba(255, 215, 0, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 75% 25%, rgba(40, 167, 69, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(212, 165, 116, 0.08) 0%, transparent 60%),
      linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 40%, rgba(212, 165, 116, 0.85) 100%), 
      url(${MainpageImage})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(4, 0),
    overflow: 'hidden',
  },
  mainPage1: {
    backgroundImage: `
      radial-gradient(circle at 25% 75%, rgba(255, 215, 0, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 75% 25%, rgba(40, 167, 69, 0.1) 0%, transparent 60%),
      linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 40%, rgba(212, 165, 116, 0.85) 100%), 
      url(${MainpageImage})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(3, 0),
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    zIndex: 10,
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 2,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    color: '#FFF',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
      transform: 'scale(1.15) translateY(-3px)',
      boxShadow: '0 15px 45px rgba(0, 0, 0, 0.3)',
      border: '2px solid rgba(255, 215, 0, 0.5)',
    },
  },
  pageHeader: {
    textAlign: 'center',
    marginBottom: theme.spacing(6),
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  pageTitle: {
    color: '#FFFFFF',
    marginBottom: theme.spacing(3),
    fontWeight: 900,
    textShadow: '3px 3px 15px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.2)',
    fontSize: '3.8rem',
    fontFamily: '"Amiri", "Tajawal", serif',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD700 30%, #FFFFFF 70%, #D4A574 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    [theme.breakpoints.down('lg')]: {
      fontSize: '3.2rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2.8rem',
      marginBottom: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.4rem',
      marginBottom: theme.spacing(2),
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.3) 50%, transparent 70%)',
      transform: 'translateX(-100%)',
      animation: '$shimmer 4s ease-in-out infinite',
    },
  },
  pageSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.4rem',
    fontWeight: 500,
    marginBottom: theme.spacing(3),
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    maxWidth: 700,
    margin: '0 auto',
    lineHeight: 1.6,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem',
      maxWidth: 600,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
      marginBottom: theme.spacing(2),
    },
  },
  statsSection: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(5),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
  },
  statChip: {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#FFFFFF',
    fontWeight: 700,
    fontSize: '1.1rem',
    padding: theme.spacing(1.5, 3),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    position: 'relative',
    overflow: 'hidden',
    '& .MuiChip-icon': {
      marginRight: theme.spacing(1),
      fontSize: '1.5rem !important',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      transform: 'scale(1.08) translateY(-3px)',
      background: 'rgba(255, 215, 0, 0.12)',
      border: '1px solid rgba(255, 215, 0, 0.4)',
      boxShadow: '0 12px 40px rgba(255, 215, 0, 0.2)',
      '& .MuiChip-icon': {
        transform: 'scale(1.1)',
      },
      '&::before': {
        transform: 'translateX(100%)',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
      transition: 'transform 0.6s ease',
    },
  },

  menuGrid: {
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(4),
    },
  },
  menuCard: {
    background: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(30px)',
    borderRadius: 28,
    padding: theme.spacing(5, 4),
    cursor: 'pointer',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-15px) scale(1.03)',
      boxShadow: '0 35px 80px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 215, 0, 0.3)',
      background: 'rgba(255, 255, 255, 1)',
      border: '2px solid rgba(255, 215, 0, 0.4)',
      '& $cardIcon': {
        transform: 'scale(1.15) rotate(8deg)',
        boxShadow: '0 12px 40px rgba(255, 215, 0, 0.4)',
      },
      '& $progressBar': {
        '& .MuiLinearProgress-bar': {
          transform: 'translateX(0) !important',
        },
      },
      '& $cardTitle': {
        color: '#1B4E65',
        textShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
      },
      '&::after': {
        transform: 'scale(1.2)',
        opacity: 0.8,
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      background: 'linear-gradient(90deg, #1B4E65 0%, #FFD700 25%, #28A745 50%, #FFD700 75%, #1B4E65 100%)',
      borderRadius: '28px 28px 0 0',
      backgroundSize: '200% 100%',
      animation: '$gradientFlow 8s linear infinite',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '120%',
      height: '120%',
      background: 'radial-gradient(circle, rgba(255,215,0,0.08) 0%, transparent 70%)',
      transform: 'translate(-50%, -50%) scale(0)',
      transition: 'all 0.6s ease',
      borderRadius: '50%',
    },
  },
  cardIcon: {
    width: 90,
    height: 90,
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 30%, #FFD700 70%, #D4A574 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(3),
    boxShadow: '0 12px 40px rgba(27, 78, 101, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.2)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    zIndex: 2,
    '& .MuiSvgIcon-root': {
      fontSize: '2.8rem !important',
      color: 'white',
      filter: 'drop-shadow(3px 3px 6px rgba(0,0,0,0.4))',
      transition: 'all 0.3s ease',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      background: 'linear-gradient(45deg, #FFD700, #1B4E65, #28A745, #FFD700)',
      borderRadius: '50%',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      animation: '$rotate 4s linear infinite',
    },
    '&:hover::before': {
      opacity: 0.7,
    },
  },
  analyzeIcon: {
    background: 'linear-gradient(135deg, #28A745 0%, #20C997 50%, #17A2B8 100%) !important',
    '&:hover': {
      transform: 'scale(1.15) rotate(5deg)',
      boxShadow: '0 15px 50px rgba(40, 167, 69, 0.4)',
    },
  },
  thinkIcon: {
    background: 'linear-gradient(135deg, #6F42C1 0%, #8B5CF6 50%, #A855F7 100%) !important',
    '&:hover': {
      transform: 'scale(1.15) rotate(-5deg)',
      boxShadow: '0 15px 50px rgba(111, 66, 193, 0.4)',
    },
  },
  helpIcon: {
    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%) !important',
    '&:hover': {
      transform: 'scale(1.15) rotate(5deg)',
      boxShadow: '0 15px 50px rgba(255, 107, 53, 0.4)',
    },
  },
  rulesIcon: {
    background: 'linear-gradient(135deg, #DC3545 0%, #E91E63 50%, #9C27B0 100%) !important',
    '&:hover': {
      transform: 'scale(1.15) rotate(-5deg)',
      boxShadow: '0 15px 50px rgba(220, 53, 69, 0.4)',
    },
  },
  cardTitle: {
    color: '#1B4E65',
    fontWeight: 800,
    fontSize: '1.6rem',
    marginBottom: theme.spacing(2.5),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    position: 'relative',
    zIndex: 2,
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem',
      marginBottom: theme.spacing(2),
    },
  },
  cardDescription: {
    color: '#5A6C7D',
    fontSize: '1.05rem',
    lineHeight: 1.7,
    fontWeight: 500,
    marginBottom: theme.spacing(3),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    position: 'relative',
    zIndex: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    background: 'rgba(27, 78, 101, 0.1)',
    marginTop: 'auto',
    position: 'relative',
    zIndex: 2,
    overflow: 'hidden',
    '& .MuiLinearProgress-bar': {
      background: 'linear-gradient(90deg, #28A745 0%, #FFD700 50%, #1B4E65 100%)',
      borderRadius: 4,
      transform: 'translateX(-100%)',
      transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'relative',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
        animation: '$progressShine 2s ease-in-out infinite',
      },
    },
  },
  exitSection: {
    textAlign: 'center',
    padding: theme.spacing(5),
    background: 'rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(220, 53, 69, 0.05) 0%, transparent 50%, rgba(220, 53, 69, 0.05) 100%)',
      animation: '$pulseBackground 4s ease-in-out infinite',
    },
  },
  exitButton: {
    background: 'linear-gradient(135deg, #DC3545 0%, #C62828 30%, #B71C1C 70%, #8E0000 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(2.5, 6),
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 700,
    textTransform: 'none',
    boxShadow: '0 12px 40px rgba(220, 53, 69, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    position: 'relative',
    overflow: 'hidden',
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1.5),
      marginLeft: 0,
      '& .MuiSvgIcon-root': {
        fontSize: '1.5rem',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      transition: 'left 0.6s ease',
    },
    '&:hover': {
      transform: 'translateY(-6px) scale(1.05)',
      boxShadow: '0 20px 60px rgba(220, 53, 69, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
      background: 'linear-gradient(135deg, #B71C1C 0%, #DC3545 30%, #C62828 70%, #DC3545 100%)',
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      transform: 'translateY(-3px) scale(1.02)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 5),
      fontSize: '1.2rem',
      '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1),
        '& .MuiSvgIcon-root': {
          fontSize: '1.3rem',
        },
      },
    },
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
  floatingParticle: {
    position: 'absolute',
    background: 'rgba(255, 215, 0, 0.6)',
    borderRadius: '50%',
    animation: '$floatAdvanced 25s linear infinite',
    filter: 'blur(1px)',
    '&:nth-child(1)': {
      width: 10,
      height: 10,
      top: '15%',
      left: '8%',
      animationDelay: '0s',
      animationDuration: '28s',
    },
    '&:nth-child(2)': {
      width: 14,
      height: 14,
      top: '75%',
      right: '12%',
      animationDelay: '7s',
      animationDuration: '32s',
    },
    '&:nth-child(3)': {
      width: 8,
      height: 8,
      bottom: '55%',
      left: '75%',
      animationDelay: '14s',
      animationDuration: '26s',
    },
    '&:nth-child(4)': {
      width: 12,
      height: 12,
      top: '35%',
      right: '35%',
      animationDelay: '21s',
      animationDuration: '30s',
    },
    '&:nth-child(5)': {
      width: 9,
      height: 9,
      bottom: '25%',
      left: '20%',
      animationDelay: '10s',
      animationDuration: '38s',
    },
    '&:nth-child(6)': {
      width: 11,
      height: 11,
      top: '10%',
      right: '18%',
      animationDelay: '4s',
      animationDuration: '27s',
    },
  },
  glowingOrb: {
    position: 'absolute',
    background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,215,0,0.1) 40%, transparent 70%)',
    borderRadius: '50%',
    animation: '$pulseGlow 8s ease-in-out infinite',
    filter: 'blur(2px)',
    '&:nth-child(7)': {
      width: 350,
      height: 350,
      top: '2%',
      right: '3%',
      animationDelay: '0s',
    },
    '&:nth-child(8)': {
      width: 250,
      height: 250,
      bottom: '5%',
      left: '5%',
      animationDelay: '4s',
    },
  },
  progressText: {
    fontSize: '0.85rem',
    color: '#1B4E65',
    fontWeight: 600,
    marginTop: theme.spacing(1.5),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    position: 'relative',
    zIndex: 2,
  },
  cardBadge: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(1.5),
    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%)',
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 700,
    padding: theme.spacing(0.4, 1.2),
    borderRadius: 15,
    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    zIndex: 10,
    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    animation: '$badgePulse 3s ease-in-out infinite',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.65rem',
      padding: theme.spacing(0.3, 1),
    },
  },

  // أنماط قسم التواصل والانشغالات
  contactSection: {
    background: 'linear-gradient(135deg, rgba(27, 78, 101, 0.9) 0%, rgba(40, 167, 69, 0.8) 50%, rgba(23, 162, 184, 0.9) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    padding: theme.spacing(5),
    marginBottom: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
      animation: '$pulseBackground 6s ease-in-out infinite',
    },
  },
  contactTitle: {
    color: '#FFFFFF',
    fontWeight: 800,
    fontSize: '2.4rem',
    marginBottom: theme.spacing(2),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -8,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 80,
      height: 4,
      background: 'linear-gradient(90deg, #28A745, #FFD700, #1B4E65)',
      borderRadius: 2,
      animation: '$underlineGlow 3s ease-in-out infinite',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  contactDescription: {
    color: '#FFFFFF',
    fontSize: '1.2rem',
    lineHeight: 1.7,
    textAlign: 'center',
    marginBottom: theme.spacing(4),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    position: 'relative',
    zIndex: 2,
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.1rem',
    },
  },
  contactOptions: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(3),
  },
  contactButton: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #28A745 50%, #17A2B8 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(1.5, 3),
    color: 'white',
    fontSize: '1rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(27, 78, 101, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    position: 'relative',
    overflow: 'hidden',
    minWidth: 160,
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1),
      marginLeft: 0,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: '0 12px 35px rgba(27, 78, 101, 0.4)',
      '&::before': {
        left: '100%',
      },
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 140,
      padding: theme.spacing(1.2, 2.5),
      fontSize: '0.9rem',
    },
  },
  emailButton: {
    background: 'linear-gradient(135deg, #DC3545 0%, #E91E63 50%, #9C27B0 100%) !important',
    '&:hover': {
      boxShadow: '0 12px 35px rgba(220, 53, 69, 0.4) !important',
    },
  },
  feedbackButton: {
    background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFC107 100%) !important',
    '&:hover': {
      boxShadow: '0 12px 35px rgba(255, 107, 53, 0.4) !important',
    },
  },
  bugButton: {
    background: 'linear-gradient(135deg, #6F42C1 0%, #8B5CF6 50%, #A855F7 100%) !important',
    '&:hover': {
      boxShadow: '0 12px 35px rgba(111, 66, 193, 0.4) !important',
    },
  },
  dialogTitle: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #28A745 50%, #17A2B8 100%)',
    color: 'white',
    textAlign: 'center',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 800,
    fontSize: '1.6rem',
    padding: theme.spacing(3, 2),
    borderRadius: '16px 16px 0 0',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(27, 78, 101, 0.3)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.05) 100%)',
      borderRadius: '16px 16px 0 0',
    },
  },
  dialogContentText: {
    textAlign: 'center',
    marginBottom: theme.spacing(3),
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    color: '#1B4E65',
    fontSize: '1.1rem',
    fontWeight: 500,
    background: 'linear-gradient(135deg, rgba(27, 78, 101, 0.05) 0%, rgba(40, 167, 69, 0.05) 100%)',
    padding: theme.spacing(2, 2.5),
    borderRadius: 12,
    border: '1px solid rgba(27, 78, 101, 0.1)',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: 'linear-gradient(90deg, #1B4E65 0%, #28A745 50%, #17A2B8 100%)',
      borderRadius: '12px 12px 0 0',
    },
  },
  dialogContent: {
    minWidth: 400,
    padding: theme.spacing(4),
    background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%)',
    borderRadius: '0 0 16px 16px',
    position: 'relative',
    direction: 'rtl',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: 'linear-gradient(90deg, #1B4E65 0%, #28A745 50%, #17A2B8 100%)',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
    },
  },
  textField: {
    marginBottom: theme.spacing(3),
    direction: 'rtl',
    '& .MuiInputLabel-root': {
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontWeight: 600,
      color: '#1B4E65',
      fontSize: '1rem',
      right: 14,
      left: 'auto',
      transformOrigin: 'top right',
      '&.Mui-focused': {
        color: '#28A745',
        fontWeight: 700,
      },
      '&.MuiInputLabel-shrink': {
        backgroundColor: 'white',
        padding: '0 8px',
        borderRadius: 4,
        transform: 'translate(14px, -9px) scale(0.75)',
        right: 14,
        left: 'auto',
      },
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: 12,
      background: 'white',
      fontFamily: '"Tajawal", "Cairo", sans-serif',
      fontSize: '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(27, 78, 101, 0.1)',
      '& fieldset': {
        borderColor: 'rgba(27, 78, 101, 0.4)',
        borderWidth: 2,
        '& legend': {
          display: 'none !important',
        },
      },
      '&:hover fieldset': {
        borderColor: '#28A745',
        borderWidth: 2,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1B4E65',
        borderWidth: 3,
        boxShadow: '0 0 0 3px rgba(27, 78, 101, 0.1)',
      },
      '& .MuiOutlinedInput-input': {
        padding: theme.spacing(2, 2),
        color: '#1B4E65',
        fontWeight: 500,
        textAlign: 'right',
        fontFamily: '"Tajawal", "Cairo", sans-serif',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        '& legend': {
          display: 'none !important',
        },
      },
    },
    '& .MuiOutlinedInput-multiline': {
      '& .MuiOutlinedInput-input': {
        minHeight: '100px',
        lineHeight: 1.6,
      },
    },
  },
  sendButton: {
    background: 'linear-gradient(135deg, #28A745 0%, #20C997 50%, #17A2B8 100%)',
    color: 'white',
    borderRadius: 30,
    padding: theme.spacing(1.5, 4),
    fontWeight: 700,
    fontSize: '1.1rem',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textTransform: 'none',
    boxShadow: '0 8px 25px rgba(40, 167, 69, 0.3)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.5s ease',
    },
    '&:hover': {
      background: 'linear-gradient(135deg, #20C997 0%, #17A2B8 50%, #1B4E65 100%)',
      transform: 'translateY(-3px) scale(1.05)',
      boxShadow: '0 12px 35px rgba(40, 167, 69, 0.4)',
      '&::before': {
        left: '100%',
      },
    },
    '& .MuiButton-startIcon': {
      marginRight: theme.spacing(1),
      marginLeft: 0,
    },
  },
  cancelButton: {
    color: '#6C757D',
    borderRadius: 30,
    padding: theme.spacing(1.5, 4),
    fontWeight: 600,
    fontSize: '1.1rem',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textTransform: 'none',
    border: '2px solid rgba(108, 117, 125, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(108, 117, 125, 0.1)',
      borderColor: '#6C757D',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(108, 117, 125, 0.2)',
    },
  },

  '@keyframes backgroundShift': {
    '0%, 100%': { transform: 'translateX(0) translateY(0)' },
    '25%': { transform: 'translateX(2%) translateY(-1%)' },
    '50%': { transform: 'translateX(-1%) translateY(2%)' },
    '75%': { transform: 'translateX(1%) translateY(1%)' },
  },
  '@keyframes gradientShift': {
    '0%, 100%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes underlineGlow': {
    '0%, 100%': { opacity: 0.6, transform: 'translateX(-50%) scaleX(1)' },
    '50%': { opacity: 1, transform: 'translateX(-50%) scaleX(1.2)' },
  },
  '@keyframes gradientFlow': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '200% 50%' },
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes progressShine': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes pulseBackground': {
    '0%, 100%': { opacity: 0.5 },
    '50%': { opacity: 0.8 },
  },
  '@keyframes floatAdvanced': {
    '0%': { 
      transform: 'translateY(0px) translateX(0px) rotate(0deg) scale(1)',
      opacity: 0.7,
    },
    '25%': { 
      transform: 'translateY(-50px) translateX(40px) rotate(90deg) scale(1.2)',
      opacity: 1,
    },
    '50%': { 
      transform: 'translateY(-100px) translateX(-30px) rotate(180deg) scale(0.8)',
      opacity: 0.8,
    },
    '75%': { 
      transform: 'translateY(-50px) translateX(-60px) rotate(270deg) scale(1.1)',
      opacity: 0.9,
    },
    '100%': { 
      transform: 'translateY(0px) translateX(0px) rotate(360deg) scale(1)',
      opacity: 0.7,
    },
  },
  '@keyframes pulseGlow': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.3,
    },
    '25%': {
      transform: 'scale(1.2)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'scale(0.8)',
      opacity: 0.4,
    },
    '75%': {
      transform: 'scale(1.1)',
      opacity: 0.6,
    },
  },
  '@keyframes badgePulse': {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
  },
}));

const MainPage = () => {
  const classes = useStyles();
  const history = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [isMobile, setIsMobile] = useState(false);

  // متغيرات قسم التواصل
  const [contactDialog, setContactDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    setIsMobile(isSmallScreen);
  }, [isSmallScreen]);

  // دوال قسم التواصل
  const handleContactOpen = (type) => {
    setDialogType(type);
    setContactDialog(true);
    // تعيين موضوع افتراضي حسب نوع الطلب
    const subjects = {
      email: 'استفسار عام',
      feedback: 'ملاحظات وتقييم',
      bug: 'بلاغ عن خطأ تقني'
    };
    setFormData(prev => ({
      ...prev,
      subject: subjects[type] || ''
    }));
  };

  const handleContactClose = () => {
    setContactDialog(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleFormChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSendMessage = async () => {
    // التحقق من صحة البيانات
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({
        open: true,
        message: 'يرجى ملء جميع الحقول المطلوبة',
        severity: 'error'
      });
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message: 'يرجى إدخال بريد إلكتروني صحيح',
        severity: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      // إعداد معاملات EmailJS
       const templateParams = {
         from_name: formData.name,
         from_email: formData.email,
         subject: formData.subject || 'رسالة من موقع تحليل النحو',
         message: formData.message,
         to_email: emailConfig.toEmail
       };

       // إرسال الرسالة باستخدام EmailJS
       await emailjs.send(
         emailConfig.serviceId,
         emailConfig.templateId,
         templateParams,
         emailConfig.publicKey
       );

      setSnackbar({
        open: true,
        message: 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        severity: 'success'
      });

      // إعادة تعيين النموذج
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      handleContactClose();

    } catch (error) {
      console.error('خطأ في إرسال الرسالة:', error);
      setSnackbar({
        open: true,
        message: 'حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleClick = (page) => {
    history(`/${page}`);
  };

  const menuItems = [
    {
      title: '📊 جمل للتحليل الوظيفي',
      description: 'اختر من مجموعة متنوعة من الجمل المتدرجة في الصعوبة لممارسة التحليل النحوي الوظيفي بطريقة تفاعلية ومنهجية مع تحليل شامل ومفصل',
      icon: <BarChartIcon />,
      iconClass: 'analyzeIcon',
      page: 'Analyze',
      delay: 200,
      progress: 95,
      progressText: 'متوفر • محدث',
      badge: 'جديد'
    },
    {
      title: '🧠 فكر وحلل بنفسك',
      description: 'مارس التحليل النحوي بنفسك واختبر معرفتك في قواعد النحو الوظيفي مع تقييم فوري ومفصل لإجاباتك وتوجيهات شخصية',
      icon: <FlashOnIcon />,
      iconClass: 'thinkIcon',
      page: 'Think',
      delay: 400,
      progress: 98,
      progressText: 'تجربة تفاعلية',
      badge: 'مُحسن'
    },
    {
      title: '📖 إرشادات الاستعمال',
      description: 'تعلم كيفية استخدام جميع ميزات البرنامج بفعالية للحصول على أفضل النتائج التعليمية والاستفادة القصوى من جميع الأدوات',
      icon: <HelpIcon />,
      iconClass: 'helpIcon',
      page: 'Adevences',
      delay: 600,
      progress: 88,
      progressText: 'دليل شامل',
      badge: 'مفيد'
    },
    {
      title: '📚 قواعد النحو الوظيفي',
      description: 'راجع القواعد الأساسية والمفاهيم المهمة في النحو الوظيفي مع أمثلة توضيحية وتمارين تطبيقية متنوعة ومراجع علمية موثقة',
      icon: <MenuBookIcon />,
      iconClass: 'rulesIcon',
      page: 'Rules',
      delay: 800,
      progress: 100,
      progressText: 'مرجع كامل',
      badge: 'أساسي'
    }
  ];

  const stats = [
    { 
      label: 'قواعد نحوية', 
      value: '15+', 
      icon: <MenuBookIcon style={{ color: '#FFD700', fontSize: '1.5rem' }} /> 
    },
    { 
      label: 'دقة التحليل', 
      value: '99.5%', 
      icon: <CheckCircleIcon style={{ color: '#4CAF50', fontSize: '1.5rem' }} /> 
    },
    { 
      label: 'سرعة المعالجة', 
      value: 'فورية', 
      icon: <SpeedIcon style={{ color: '#2196F3', fontSize: '1.5rem' }} /> 
    },
    { 
      label: 'تحديث مستمر', 
      value: '2024', 
      icon: <TrendingUpIcon style={{ color: '#FF9800', fontSize: '1.5rem' }} /> 
    }
  ];

  return (
    <div className={!isSmallScreen ? classes.mainPage : classes.mainPage1}>
      {/* العناصر المتحركة المتطورة */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.glowingOrb}></div>
        <div className={classes.glowingOrb}></div>
      </div>

      {/* زر الرجوع المحسن */}
      <Tooltip title="العودة للصفحة السابقة" placement="right">
        <IconButton 
          onClick={() => handleClick('')} 
          className={classes.backButton} 
          aria-label="back"
        >
          <ArrowBackIcon style={{ fontSize: '2.2rem' }} />
        </IconButton>
      </Tooltip>





      <Container maxWidth="xl" className={classes.container}>
        {/* رأس الصفحة المحسن */}
        <Zoom in={true} timeout={1200}>
          <Box className={classes.pageHeader}>
            <Typography variant="h1" dir="rtl" className={classes.pageTitle}>
              <SchoolIcon style={{ marginLeft: '20px', fontSize: '4.5rem', verticalAlign: 'middle' }} />
              الصفحة الرئيسية
            </Typography>
            
            <Typography className={classes.pageSubtitle} dir="rtl">
              استكشف جميع ميزات المحلل الذكي في النحو الوظيفي واختر الأداة المناسبة لاحتياجاتك التعليمية
            </Typography>

            {/* إحصائيات الأداء المحسنة */}
            <Box className={classes.statsSection}>
              {stats.map((stat, index) => (
                <Grow
                  key={index}
                  in={true}
                  timeout={800}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <Chip 
                    icon={stat.icon}
                    label={`${stat.value} ${stat.label}`}
                    className={classes.statChip}
                    clickable
                  />
                </Grow>
              ))}
            </Box>
          </Box>
        </Zoom>

        {/* شبكة القوائم المحسنة */}
        <Grid container spacing={4} className={classes.menuGrid}>
          {menuItems.map((item, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Grow in={true} timeout={1000} style={{ transitionDelay: `${item.delay + 600}ms` }}>
                <Box 
                  className={classes.menuCard}
                  onClick={() => handleClick(item.page)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && handleClick(item.page)}
                >
                  {item.badge && (
                    <Box className={classes.cardBadge}>
                      {item.badge}
                    </Box>
                  )}
                  
                  <Box className={`${classes.cardIcon} ${classes[item.iconClass]}`}>
                    {item.icon}
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    className={classes.cardTitle}
                    dir="rtl"
                  >
                    {item.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    className={classes.cardDescription}
                    dir="rtl"
                  >
                    {item.description}
                  </Typography>

                  <LinearProgress 
                    variant="determinate" 
                    value={item.progress} 
                    className={classes.progressBar}
                  />
                  
                  <Typography className={classes.progressText} dir="rtl">
                    {item.progressText} • {item.progress}%
                  </Typography>
                </Box>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* قسم التواصل والدعم */}
        <Fade in={true} timeout={1000} style={{ transitionDelay: '1400ms' }}>
          <Box className={classes.contactSection}>
            <Typography variant="h2" className={classes.contactTitle} dir="rtl">
              <ContactSupportIcon style={{ marginLeft: '15px', fontSize: '2.5rem', verticalAlign: 'middle', color: '#FFD700' }} />
              تواصل معنا
            </Typography>
            
            <Typography className={classes.contactDescription} dir="rtl">
              نحن هنا لمساعدتك! شاركنا استفساراتك، ملاحظاتك، أو أي مشاكل تقنية تواجهها
            </Typography>

            <Box className={classes.contactOptions}>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                className={`${classes.contactButton} ${classes.emailButton}`}
                onClick={() => handleContactOpen('email')}
              >
                استفسار عام
              </Button>
              
              <Button
                variant="contained"
                startIcon={<FeedbackIcon />}
                className={`${classes.contactButton} ${classes.feedbackButton}`}
                onClick={() => handleContactOpen('feedback')}
              >
                ملاحظات وتقييم
              </Button>
              
              <Button
                variant="contained"
                startIcon={<BugReportIcon />}
                className={`${classes.contactButton} ${classes.bugButton}`}
                onClick={() => handleContactOpen('bug')}
              >
                بلاغ عن خطأ
              </Button>
            </Box>

            <Typography 
              variant="body2" 
              style={{ 
                textAlign: 'center', 
                color: 'rgba(255, 255, 255, 0.9)', 
                fontStyle: 'italic',
                fontFamily: '"Tajawal", "Cairo", sans-serif',
                fontSize: '1rem',
                fontWeight: 500,
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
              }}
              dir="rtl"
            >
              📧 arabewadifi@gmail.com | ⏰ نرد خلال 24 ساعة
            </Typography>
          </Box>
        </Fade>

        {/* قسم الخروج المحسن */}
        <Fade in={true} timeout={1000} style={{ transitionDelay: '1600ms' }}>
          <Box className={classes.exitSection}>
            <Typography 
              variant="h6" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.95)', 
                marginBottom: '1.5rem',
                fontFamily: '"Tajawal", "Cairo", sans-serif',
                fontWeight: 600,
                fontSize: '1.4rem'
              }}
              dir="rtl"
            >
              هل تريد إنهاء جلسة التعلم؟
            </Typography>
            
            <Button 
              variant="contained" 
              onClick={() => handleClick('ExitApp')} 
              className={classes.exitButton}
              startIcon={<ExitToAppIcon />}
              size="large"
            >
              خروج آمن
            </Button>
          </Box>
        </Fade>

        {/* نافذة الحوار للتواصل */}
        <Dialog 
          open={contactDialog} 
          onClose={handleContactClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              borderRadius: 24,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 50%, rgba(233,236,239,0.92) 100%)',
              backdropFilter: 'blur(30px)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)',
              border: '2px solid rgba(27, 78, 101, 0.1)',
              overflow: 'hidden',
            }
          }}
          BackdropProps={{
            style: {
              backgroundColor: 'rgba(27, 78, 101, 0.4)',
              backdropFilter: 'blur(8px)',
            }
          }}
        >
          <DialogTitle className={classes.dialogTitle}>
            {dialogType === 'email' && (
              <>
                <EmailIcon style={{ marginLeft: 10, verticalAlign: 'middle' }} />
                استفسار عام
              </>
            )}
            {dialogType === 'feedback' && (
              <>
                <FeedbackIcon style={{ marginLeft: 10, verticalAlign: 'middle' }} />
                ملاحظات وتقييم
              </>
            )}
            {dialogType === 'bug' && (
              <>
                <BugReportIcon style={{ marginLeft: 10, verticalAlign: 'middle' }} />
                بلاغ عن خطأ تقني
              </>
            )}
          </DialogTitle>
          
          <DialogContent className={classes.dialogContent}>
            <DialogContentText className={classes.dialogContentText}>
              يرجى ملء النموذج أدناه وسنتواصل معك في أقرب وقت ممكن 📝
            </DialogContentText>
            
            <TextField
              label="الاسم الكامل"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleFormChange('name')}
              className={classes.textField}
              required
              dir="rtl"
              InputLabelProps={{
                style: { fontFamily: '"Tajawal", "Cairo", sans-serif' }
              }}
            />
            
            <TextField
              label="البريد الإلكتروني"
              fullWidth
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleFormChange('email')}
              className={classes.textField}
              required
              dir="rtl"
              InputLabelProps={{
                style: { fontFamily: '"Tajawal", "Cairo", sans-serif' }
              }}
            />
            
            <TextField
              label="الموضوع"
              fullWidth
              variant="outlined"
              value={formData.subject}
              onChange={handleFormChange('subject')}
              className={classes.textField}
              dir="rtl"
              InputLabelProps={{
                style: { fontFamily: '"Tajawal", "Cairo", sans-serif' }
              }}
            />
            
            <TextField
              label="الرسالة"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleFormChange('message')}
              className={classes.textField}
              required
              dir="rtl"
              InputLabelProps={{
                style: { fontFamily: '"Tajawal", "Cairo", sans-serif' }
              }}
            />
          </DialogContent>
          
          <DialogActions style={{ 
            padding: '24px 32px 32px', 
            background: 'linear-gradient(135deg, rgba(248,250,252,0.8) 0%, rgba(233,236,239,0.6) 100%)',
            borderTop: '1px solid rgba(27, 78, 101, 0.1)',
            gap: '12px',
            justifyContent: 'center'
          }}>
            <Button 
              onClick={handleContactClose} 
              className={classes.cancelButton}
              size="large"
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleSendMessage}
              className={classes.sendButton}
              startIcon={isLoading ? null : <SendIcon />}
              variant="contained"
              size="large"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginLeft: '8px'
                  }}></div>
                  جاري الإرسال...
                </>
              ) : (
                'إرسال الرسالة'
              )}
            </Button>
          </DialogActions>
        </Dialog>

        {/* إشعار النجاح/الخطأ */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleSnackbarClose} 
            severity={snackbar.severity}
            style={{
              fontFamily: '"Tajawal", "Cairo", sans-serif',
              borderRadius: 12
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
};

export default MainPage;