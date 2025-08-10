import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroApplication from "./IntroApplication1.png";
import { 
  makeStyles, 
  Button, 
  Grid, 
  Typography, 
  Container, 
  Box, 
  Fade, 
  Grow,
  Card,
  CardContent,
  Zoom,
  Chip,
  LinearProgress,
  Avatar
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/Info';
import SchoolIcon from '@material-ui/icons/School';
import SpeedIcon from '@material-ui/icons/Speed';
import StarIcon from '@material-ui/icons/Star';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import CodeIcon from '@material-ui/icons/Code';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import MouseIcon from '@material-ui/icons/Mouse';

const useStyles = makeStyles((theme) => ({
  mainPageStyle: {
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(255, 215, 0, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(46, 106, 132, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(212, 165, 116, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 40%, rgba(212, 165, 116, 0.85) 100%), 
      url(${IntroApplication})
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: theme.spacing(4, 0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: 'white',
    position: 'relative',
    overflow: 'visible',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3, 0),
      minHeight: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 0),
    },
  },
  container: {
    position: 'relative',
    zIndex: 10,
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(3),
      padding: theme.spacing(1),
    },
  },
  heroSection: {
    marginBottom: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(6),
    },
  },
  brandContainer: {
    position: 'relative',
    marginBottom: theme.spacing(4),
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: '4.2rem',
    fontWeight: 900,
    textShadow: '3px 3px 15px rgba(0,0,0,0.4), 0 0 30px rgba(255,215,0,0.3)',
    marginBottom: theme.spacing(3),
    lineHeight: 1.3,
    padding: theme.spacing(2, 1),
    fontFamily: '"Amiri", "Tajawal", serif',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFD700 50%, #FFFFFF 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    position: 'relative',
    overflow: 'visible',
    maxWidth: '100%',
    wordWrap: 'break-word',
    [theme.breakpoints.down('lg')]: {
      fontSize: '3.6rem',
      lineHeight: 1.2,
      padding: theme.spacing(1.5, 1),
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      lineHeight: 1.2,
      padding: theme.spacing(1, 0.5),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.4rem',
      marginBottom: theme.spacing(2),
      lineHeight: 1.3,
      padding: theme.spacing(1, 0.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
      lineHeight: 1.4,
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, transparent 30%, rgba(255,215,0,0.4) 50%, transparent 70%)',
      transform: 'translateX(-100%)',
      animation: '$shimmer 3s ease-in-out infinite',
    },
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: '1.6rem',
    fontWeight: 500,
    marginBottom: theme.spacing(2),
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    maxWidth: 700,
    margin: '0 auto',
    lineHeight: 1.6,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.4rem',
      maxWidth: 600,
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      marginBottom: theme.spacing(1.5),
      maxWidth: '90%',
    },
  },
  tagline: {
    color: 'rgba(255, 215, 0, 0.9)',
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(5),
    textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
      marginBottom: theme.spacing(4),
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(8),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      gap: theme.spacing(2),
      marginBottom: theme.spacing(6),
    },
  },
  primaryButton: {
    background: 'linear-gradient(135deg, #28A745 0%, #34CE57 50%, #20C997 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(2.5, 5),
    color: 'white',
    fontSize: '1.3rem',
    fontWeight: 700,
    textTransform: 'none',
    boxShadow: '0 8px 32px rgba(40, 167, 69, 0.4), 0 0 20px rgba(40, 167, 69, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 200,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    '& .MuiButton-startIcon': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0.5),
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover': {
      transform: 'translateY(-5px) scale(1.08)',
      boxShadow: '0 15px 45px rgba(40, 167, 69, 0.6), 0 0 30px rgba(40, 167, 69, 0.4)',
      background: 'linear-gradient(135deg, #34CE57 0%, #28A745 50%, #20C997 100%)',
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      transform: 'translateY(-2px) scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
      fontSize: '1.1rem',
      minWidth: 180,
      '& .MuiButton-startIcon': {
        marginLeft: theme.spacing(0.8),
        marginRight: theme.spacing(0.4),
      },
    },
  },
  secondaryButton: {
    background: 'linear-gradient(135deg, #D4A574 0%, #B8935F 50%, #FFD700 100%)',
    border: 'none',
    borderRadius: 50,
    padding: theme.spacing(2.5, 5),
    color: 'white',
    fontSize: '1.2rem',
    fontWeight: 600,
    textTransform: 'none',
    boxShadow: '0 6px 24px rgba(212, 165, 116, 0.4), 0 0 15px rgba(212, 165, 116, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: 200,
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    '& .MuiButton-startIcon': {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0.5),
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      transition: 'left 0.5s',
    },
    '&:hover': {
      transform: 'translateY(-5px) scale(1.08)',
      boxShadow: '0 12px 35px rgba(212, 165, 116, 0.6), 0 0 25px rgba(212, 165, 116, 0.4)',
      background: 'linear-gradient(135deg, #FFD700 0%, #D4A574 50%, #B8935F 100%)',
      '&::before': {
        left: '100%',
      },
    },
    '&:active': {
      transform: 'translateY(-2px) scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 4),
      fontSize: '1rem',
      minWidth: 180,
      '& .MuiButton-startIcon': {
        marginLeft: theme.spacing(0.8),
        marginRight: theme.spacing(0.4),
      },
    },
  },
  featuresSection: {
    width: '100%',
    marginTop: theme.spacing(4),
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: theme.spacing(3),
    marginBottom: theme.spacing(6),
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing(2.5),
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(2),
      padding: theme.spacing(1, 0),
    },
  },
  featureCard: {
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 250, 0.9) 50%, rgba(255, 255, 255, 0.95) 100%)',
    backdropFilter: 'blur(25px)',
    borderRadius: 24,
    border: '2px solid rgba(255, 215, 0, 0.2)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.1)',
    overflow: 'visible',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    padding: theme.spacing(3),
    minHeight: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-15px) scale(1.05)',
      boxShadow: '0 30px 70px rgba(0, 0, 0, 0.2), 0 0 40px rgba(255, 215, 0, 0.3)',
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 1) 0%, rgba(248, 249, 250, 0.95) 50%, rgba(255, 255, 255, 1) 100%)',
      border: '2px solid rgba(255, 215, 0, 0.6)',
      '& $featureIcon': {
        transform: 'scale(1.15) rotate(5deg)',
        boxShadow: '0 8px 30px rgba(255, 215, 0, 0.4)',
      },
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 6,
      background: 'linear-gradient(90deg, #FFD700 0%, #28A745 25%, #FF6B35 50%, #6F42C1 75%, #20C997 100%)',
      borderRadius: '24px 24px 0 0',
      boxShadow: '0 3px 12px rgba(255, 215, 0, 0.4)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0%',
      height: '0%',
      background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
      transition: 'all 0.5s ease',
      zIndex: 0,
    },
    '&:hover::after': {
      width: '200%',
      height: '200%',
    },
    [theme.breakpoints.down('lg')]: {
      minHeight: 280,
      padding: theme.spacing(2.5),
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 260,
      padding: theme.spacing(2),
    },
  },
  featureIcon: {
    width: 70,
    height: 70,
    background: (props) => `linear-gradient(135deg, ${props?.color || '#FFD700'} 0%, rgba(255, 215, 0, 0.8) 100%)`,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    border: '3px solid rgba(255, 255, 255, 0.4)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.2)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    zIndex: 2,
    '&:hover': {
      transform: 'scale(1.15) rotate(10deg)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25), 0 0 30px rgba(255, 215, 0, 0.4)',
      border: '3px solid rgba(255, 255, 255, 0.8)',
    },
    '& svg': {
      fontSize: '2.2rem',
      color: 'white',
      filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3))',
      transition: 'all 0.3s ease',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -5,
      left: -5,
      right: -5,
      bottom: -5,
      borderRadius: '50%',
      background: 'linear-gradient(45deg, #FFD700, #FF6B35, #28A745, #6F42C1)',
      opacity: 0,
      animation: '$rotate 3s linear infinite',
      transition: 'opacity 0.3s ease',
    },
    '&:hover::before': {
      opacity: 0.7,
    },
    [theme.breakpoints.down('lg')]: {
      width: 65,
      height: 65,
      '& svg': {
        fontSize: '2rem',
      },
    },
    [theme.breakpoints.down('md')]: {
      width: 60,
      height: 60,
      marginBottom: theme.spacing(1.5),
      '& svg': {
        fontSize: '1.8rem',
      },
    },
    [theme.breakpoints.down('sm')]: {
      width: 55,
      height: 55,
      marginBottom: theme.spacing(1.5),
      '& svg': {
        fontSize: '1.6rem',
      },
    },
  },
  featureTitle: {
    fontSize: '1.5rem',
    fontWeight: 800,
    color: '#1B4E65',
    marginBottom: theme.spacing(1.5),
    textAlign: 'center',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    lineHeight: 1.3,
    position: 'relative',
    zIndex: 2,
    transition: 'all 0.3s ease',
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.4rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
      marginBottom: theme.spacing(1),
    },
  },
  featureDescription: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#5A6C7D',
    textAlign: 'center',
    lineHeight: 1.7,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    padding: theme.spacing(0.5, 1),
    wordWrap: 'break-word',
    overflow: 'visible',
    position: 'relative',
    zIndex: 2,
    [theme.breakpoints.down('lg')]: {
      fontSize: '0.95rem',
      padding: theme.spacing(0.5, 0.8),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem',
      padding: theme.spacing(0.5, 0.5),
      lineHeight: 1.6,
    },
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
    gap: theme.spacing(4),
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2, 0),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: theme.spacing(2),
      marginTop: theme.spacing(4),
    },
  },
  statBox: {
    textAlign: 'center',
    padding: theme.spacing(3),
    background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    backdropFilter: 'blur(20px)',
    borderRadius: 20,
    border: '2px solid rgba(255, 255, 255, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-8px) scale(1.08)',
      background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
      border: '2px solid rgba(255, 215, 0, 0.4)',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2), 0 0 25px rgba(255, 215, 0, 0.3)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
      transition: 'left 0.6s',
    },
    '&:hover::before': {
      left: '100%',
    },
  },
  statNumber: {
    fontSize: '3rem',
    fontWeight: 900,
    color: '#FFD700',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    display: 'block',
    textShadow: '3px 3px 12px rgba(0,0,0,0.4), 0 0 20px rgba(255,215,0,0.3)',
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6B35 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: theme.spacing(1),
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.4rem',
    },
  },
  statLabel: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textShadow: '1px 1px 4px rgba(0,0,0,0.3)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  statIcon: {
    fontSize: '2rem',
    color: '#FFD700',
    marginBottom: theme.spacing(1),
    filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))',
    transition: 'all 0.3s ease',
  },
  progressBar: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
    height: 8,
    borderRadius: 4,
    background: 'rgba(255, 255, 255, 0.1)',
    '& .MuiLinearProgress-bar': {
      background: 'linear-gradient(90deg, #28A745, #FFD700, #D4A574)',
    },
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textAlign: 'center',
  },
  floatingElements: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 1,
    overflow: 'hidden',
  },
  floatingParticle: {
    position: 'absolute',
    background: 'rgba(255, 215, 0, 0.6)',
    borderRadius: '50%',
    animation: '$floatComplex 15s linear infinite',
    '&:nth-child(1)': {
      width: 4,
      height: 4,
      top: '20%',
      left: '10%',
      animationDelay: '0s',
      animationDuration: '20s',
    },
    '&:nth-child(2)': {
      width: 6,
      height: 6,
      top: '80%',
      right: '15%',
      animationDelay: '5s',
      animationDuration: '25s',
    },
    '&:nth-child(3)': {
      width: 3,
      height: 3,
      bottom: '60%',
      left: '70%',
      animationDelay: '10s',
      animationDuration: '18s',
    },
    '&:nth-child(4)': {
      width: 5,
      height: 5,
      top: '40%',
      right: '40%',
      animationDelay: '15s',
      animationDuration: '22s',
    },
    '&:nth-child(5)': {
      width: 4,
      height: 4,
      bottom: '20%',
      left: '30%',
      animationDelay: '8s',
      animationDuration: '30s',
    },
  },
  glowingOrb: {
    position: 'absolute',
    background: 'radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: '$pulse 4s ease-in-out infinite',
    '&:nth-child(6)': {
      width: 200,
      height: 200,
      top: '10%',
      right: '10%',
      animationDelay: '0s',
    },
    '&:nth-child(7)': {
      width: 150,
      height: 150,
      bottom: '15%',
      left: '5%',
      animationDelay: '2s',
    },
  },
  '@keyframes shimmer': {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  '@keyframes floatComplex': {
    '0%': { 
      transform: 'translateY(0px) translateX(0px) rotate(0deg)',
      opacity: 0.7,
    },
    '33%': { 
      transform: 'translateY(-30px) translateX(30px) rotate(120deg)',
      opacity: 1,
    },
    '66%': { 
      transform: 'translateY(-60px) translateX(-20px) rotate(240deg)',
      opacity: 0.8,
    },
    '100%': { 
      transform: 'translateY(0px) translateX(0px) rotate(360deg)',
      opacity: 0.7,
    },
  },
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.3,
    },
    '50%': {
      transform: 'scale(1.2)',
      opacity: 0.6,
    },
  },
  '@keyframes rotate': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
  versionChip: {
    position: 'fixed',
    top: theme.spacing(2),
    right: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#FFD700',
    fontWeight: 600,
    fontSize: '0.9rem',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    zIndex: 1000,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    '& .MuiChip-icon': {
      color: '#FFD700',
      fontSize: '1.1rem',
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.3),
      order: -1, // لجعل الأيقونة تظهر من اليسار في RTL
    },
    '& .MuiChip-label': {
      padding: theme.spacing(0.5, 1),
      fontSize: '0.9rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem',
      top: theme.spacing(1),
      right: theme.spacing(1),
      '& .MuiChip-icon': {
        fontSize: '1rem',
        marginLeft: theme.spacing(0.4),
        marginRight: theme.spacing(0.2),
      },
      '& .MuiChip-label': {
        padding: theme.spacing(0.4, 0.8),
        fontSize: '0.8rem',
      },
    },
  },
}));

const Capsulate = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setIsLoading(false);
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleClick = (page) => {
    history(`/${page}`);
  };

  const features = [
    {
      icon: <SpeedIcon />,
      title: 'تحليل نحوي فوري',
      description: 'تحليل ذكي وسريع للجمل النحوية الوظيفية في ثوانٍ معدودة مع نتائج دقيقة ومفصلة'
    },
    {
      icon: <SchoolIcon />,
      title: 'تعليم تفاعلي متطور',
      description: 'واجهة تعليمية حديثة وسهلة الاستخدام تجعل تعلم النحو الوظيفي ممتعًا وبسيطًا'
    },
    {
      icon: <SettingsIcon />,
      title: 'ذكاء اصطناعي متقدم',
      description: 'تقنيات ذكية متطورة لفهم وتحليل النصوص العربية بدقة عالية ومعالجة لغوية احترافية'
    },
    {
      icon: <CheckCircleIcon />,
      title: 'دقة وموثوقية عالية',
      description: 'نتائج موثوقة ودقيقة في التحليل النحوي مع ضمان الجودة والصحة اللغوية'
    }
  ];

  const stats = [
    { number: '15+', label: 'قاعدة نحوية وظيفية' },
    { number: '99%', label: 'دقة في التحليل' },
    { number: '2024', label: 'التحديث الأحدث' },
    { number: '∞', label: 'استخدام مجاني تمامًا' }
  ];

  if (isLoading) {
    return (
      <div className={classes.mainPageStyle}>
        <Container maxWidth="sm" className={classes.container}>
          <Fade in={true} timeout={1000}>
            <Box textAlign="center">
              <EmojiObjectsIcon style={{ fontSize: '4rem', color: '#FFD700', marginBottom: '2rem' }} />
              <Typography variant="h4" style={{ color: 'white', marginBottom: '2rem', fontFamily: '"Tajawal", "Cairo", sans-serif' }}>
                جاري تحضير التجربة...
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={progress} 
                className={classes.progressBar}
              />
              <Typography className={classes.loadingText}>
                {Math.round(progress)}% مكتمل
              </Typography>
            </Box>
          </Fade>
        </Container>
      </div>
    );
  }

  return (
    <div className={classes.mainPageStyle}>
      <Chip 
        label="إصدار 2024" 
        className={classes.versionChip}
        icon={<StarIcon />}
      />

      {/* العناصر المتحركة المتطورة */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.floatingParticle}></div>
        <div className={classes.glowingOrb}></div>
        <div className={classes.glowingOrb}></div>
      </div>

      <Container maxWidth="lg" className={classes.container}>
        {/* القسم الرئيسي */}
        <Zoom in={true} timeout={1200}>
          <Box className={classes.heroSection}>
            <Box className={classes.brandContainer}>
              <Typography variant="h1" className={classes.mainTitle} dir="rtl">
                🌟 المحلّل الذّكي في النّحو الوظيفي 🌟
              </Typography>
            </Box>
            
            <Typography variant="h5" className={classes.subtitle} dir="rtl">
              أداة تعليمية تفاعلية متطورة لتعلم وممارسة قواعد النحو الوظيفي بطريقة حديثة وذكية تجمع بين الأصالة العربية والتكنولوجيا المتقدمة
            </Typography>

            <Typography className={classes.tagline} dir="rtl">
              ⭐ تجربة تعليمية استثنائية • تحليل فوري دقيق • تعلم تفاعلي ممتع ⭐
            </Typography>

            <Box className={classes.buttonContainer}>
              <Button 
                variant="contained" 
                onClick={() => handleClick('MainPage')} 
                className={classes.primaryButton}
                startIcon={<PlayArrowIcon />}
                size="large"
              >
                🚀 ابدأ التعلم الآن
              </Button>
              
              <Button 
                variant="contained" 
                onClick={() => handleClick('IdeaApplication')} 
                className={classes.secondaryButton}
                startIcon={<InfoIcon />}
                size="large"
              >
                💡 اكتشف فكرة البرنامج
              </Button>
            </Box>
          </Box>
        </Zoom>

        {/* قسم الميزات */}
        <Fade in={true} timeout={1500} style={{ transitionDelay: '800ms' }}>
          <Box className={classes.featuresSection}>
            <Box className={classes.featuresGrid}>
              {features.map((feature, index) => (
                <Grow
                  key={index}
                  in={true}
                  timeout={1000}
                  style={{ transitionDelay: `${1200 + index * 200}ms` }}
                >
                  <Card className={classes.featureCard}>
                    <CardContent style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Box className={classes.featureIcon}>
                          {feature.icon}
                        </Box>
                        <Typography className={classes.featureTitle} dir="rtl">
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography className={classes.featureDescription} dir="rtl">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grow>
              ))}
            </Box>
          </Box>
        </Fade>

        {/* قسم الإحصائيات */}
        <Fade in={true} timeout={1500} style={{ transitionDelay: '2000ms' }}>
          <Box className={classes.statsSection}>
            {stats.map((stat, index) => (
              <Grow
                key={index}
                in={true}
                timeout={800}
                style={{ transitionDelay: `${2400 + index * 150}ms` }}
              >
                <Box className={classes.statBox}>
                  <Box className={classes.statIcon}>
                    {stat.icon}
                  </Box>
                  <Typography component="span" className={classes.statNumber}>
                    {stat.number}
                  </Typography>
                  <Typography className={classes.statLabel} dir="rtl">
                    {stat.label}
                  </Typography>
                </Box>
              </Grow>
            ))}
          </Box>
        </Fade>
      </Container>
    </div>
  );
};

export default Capsulate;