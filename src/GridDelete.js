import React, { useState, useEffect } from 'react';
import { 
  makeStyles, 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Fade, 
  Grow,
  LinearProgress,
  Chip,
  IconButton
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import mainPageBackground from './images1.PNG';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import BuildIcon from '@material-ui/icons/Build';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import StarIcon from '@material-ui/icons/Star';
import NotificationsIcon from '@material-ui/icons/Notifications';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.8) 100%), url(${mainPageBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(4, 0),
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 2,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    color: '#FFF',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
      transform: 'scale(1.1)',
    },
  },
  mainCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    textAlign: 'center',
  },
  headerSection: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: 'white',
    padding: theme.spacing(6, 4),
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '20px solid #2E6A84',
    },
  },
  mainIcon: {
    fontSize: '4rem',
    marginBottom: theme.spacing(2),
    filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))',
    animation: '$bounce 2s ease-in-out infinite',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 800,
    fontFamily: '"Tajawal", "Cairo", serif',
    textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
    },
  },
  subtitle: {
    fontSize: '1.2rem',
    fontWeight: 500,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    opacity: 0.9,
    letterSpacing: '0.5px',
  },
  contentSection: {
    padding: theme.spacing(6, 4),
  },
  description: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#2C5F41',
    lineHeight: 1.8,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(4),
    textAlign: 'center',
  },
  progressSection: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  progressLabel: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1B4E65',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(2),
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(27, 78, 101, 0.1)',
    '& .MuiLinearProgress-bar': {
      background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
      borderRadius: 6,
    },
  },
  featuresGrid: {
    marginTop: theme.spacing(4),
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: theme.spacing(3),
    border: '1px solid rgba(27, 78, 101, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
      background: 'rgba(255, 255, 255, 0.95)',
    },
  },
  featureIcon: {
    fontSize: '2.5rem',
    color: '#1B4E65',
    marginBottom: theme.spacing(2),
  },
  featureTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#1B4E65',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(1),
  },
  featureText: {
    fontSize: '1rem',
    fontWeight: 500,
    color: '#2C5F41',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    lineHeight: 1.6,
  },
  statusChips: {
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginTop: theme.spacing(3),
  },
  statusChip: {
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 600,
    fontSize: '0.9rem',
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
  floatingShape: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '50%',
    animation: '$float 20s ease-in-out infinite',
    '&:nth-child(1)': {
      width: 100,
      height: 100,
      top: '10%',
      left: '5%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      width: 150,
      height: 150,
      top: '70%',
      right: '8%',
      animationDelay: '7s',
    },
    '&:nth-child(3)': {
      width: 80,
      height: 80,
      bottom: '20%',
      left: '10%',
      animationDelay: '14s',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
      opacity: 0.3,
    },
    '50%': {
      transform: 'translateY(-25px) rotate(180deg)',
      opacity: 0.6,
    },
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-10px)',
    },
    '60%': {
      transform: 'translateY(-5px)',
    },
  },
}));

const ComingSoon = () => {
  const classes = useStyles();
  const history = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.5;
        return newProgress > 75 ? 75 : newProgress;
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleBack = () => {
    history(-1);
  };

  const upcomingFeatures = [
    {
      icon: <StarIcon />,
      title: 'تحليل ذكي متقدم',
      description: 'خوارزميات ذكية لتحليل الجمل المعقدة وتقديم شروحات تفصيلية'
    },
    {
      icon: <TrendingUpIcon />,
      title: 'تتبع التقدم',
      description: 'نظام لتتبع تقدمك في تعلم النحو الوظيفي مع إحصائيات مفصلة'
    },
    {
      icon: <NotificationsIcon />,
      title: 'تنبيهات ذكية',
      description: 'تذكيرات شخصية لممارسة التحليل النحوي بانتظام'
    },
    {
      icon: <UpdateIcon />,
      title: 'محتوى محدث',
      description: 'إضافة جمل وتمارين جديدة بشكل دوري لإثراء التجربة'
    }
  ];

  return (
    <div className={classes.root}>
      {/* العناصر المتحركة في الخلفية */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
        <div className={classes.floatingShape}></div>
      </div>

      <IconButton 
        onClick={handleBack} 
        className={classes.backButton} 
        aria-label="back"
      >
        <ArrowBackIcon style={{ fontSize: '2.5rem' }} />
      </IconButton>

      <Container maxWidth="md" className={classes.container}>
        <Fade in={true} timeout={1000}>
          <Card className={classes.mainCard}>
            <Box className={classes.headerSection}>
              <Grow in={true} timeout={1200}>
                <HourglassEmptyIcon className={classes.mainIcon} />
              </Grow>
              <Typography variant="h1" className={classes.title} dir="rtl">
                قريباً...
              </Typography>
              <Typography className={classes.subtitle} dir="rtl">
                ميزات جديدة ومثيرة في الطريق إليك
              </Typography>
            </Box>

            <CardContent className={classes.contentSection}>
              <Fade in={true} timeout={1400}>
                <Typography className={classes.description} dir="rtl">
                  نعمل بجد لتطوير ميزات جديدة ومثيرة لتحسين تجربتك في تعلم النحو الوظيفي. 
                  ترقب التحديثات القادمة التي ستجعل رحلة التعلم أكثر تفاعلية ومتعة!
                </Typography>
              </Fade>

              <Box className={classes.progressSection}>
                <Typography className={classes.progressLabel} dir="rtl">
                  مستوى التطوير: {Math.round(progress)}%
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  className={classes.progressBar}
                />
              </Box>

              <Box className={classes.statusChips}>
                <Chip 
                  icon={<BuildIcon />} 
                  label="قيد التطوير" 
                  className={classes.statusChip}
                  color="primary"
                />
                <Chip 
                  icon={<StarIcon />} 
                  label="ميزات جديدة" 
                  className={classes.statusChip}
                  style={{ backgroundColor: '#28A745', color: 'white' }}
                />
                <Chip 
                  icon={<TrendingUpIcon />} 
                  label="تحسينات" 
                  className={classes.statusChip}
                  style={{ backgroundColor: '#FFC107', color: 'white' }}
                />
              </Box>

              <Grid container spacing={3} className={classes.featuresGrid}>
                {upcomingFeatures.map((feature, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Fade 
                      in={true} 
                      timeout={1000} 
                      style={{ transitionDelay: `${index * 200 + 600}ms` }}
                    >
                      <Box className={classes.featureCard}>
                        <Box className={classes.featureIcon}>
                          {feature.icon}
                        </Box>
                        <Typography className={classes.featureTitle} dir="rtl">
                          {feature.title}
                        </Typography>
                        <Typography className={classes.featureText} dir="rtl">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </div>
  );
};

export default ComingSoon;