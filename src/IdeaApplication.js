import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IntroApplication from "./IdeaBackground1.jpg";
import { 
  makeStyles, 
  IconButton, 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Avatar, 
  Fade, 
  Grow,
  useMediaQuery,
  Chip,
  Grid
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import CodeIcon from '@material-ui/icons/Code';
import HelpIcon from '@material-ui/icons/Help';
import StarIcon from '@material-ui/icons/Star';
import WorkIcon from '@material-ui/icons/Work';
import GroupIcon from '@material-ui/icons/Group';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(135deg, rgba(27, 78, 101, 0.95) 0%, rgba(46, 106, 132, 0.9) 50%, rgba(212, 165, 116, 0.85) 100%), url(${IntroApplication})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    position: 'relative',
    padding: theme.spacing(4, 0),
    overflow: 'hidden',
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  pageTitle: {
    color: '#FFFFFF',
    fontWeight: 800,
    textShadow: '3px 3px 10px rgba(0,0,0,0.5)',
    fontSize: '3.5rem',
    marginBottom: theme.spacing(6),
    fontFamily: '"Amiri", "Tajawal", serif',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.8rem',
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.2rem',
      marginBottom: theme.spacing(3),
    },
  },
  backButton: {
    position: 'fixed',
    top: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: theme.zIndex.appBar + 2,
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#FFF',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.25)',
      transform: 'scale(1.1) translateY(-2px)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3)',
    },
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: theme.spacing(4),
    marginBottom: theme.spacing(6),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gap: theme.spacing(3),
    },
  },
  memberCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    '&:hover': {
      transform: 'translateY(-15px) scale(1.02)',
      boxShadow: '0 30px 80px rgba(0, 0, 0, 0.3)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 6,
      background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #F7931E 100%)',
    },
  },
  ideaCard: {
    '&::before': {
      background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    },
  },
  devCard: {
    '&::before': {
      background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    },
  },
  helpCard: {
    '&::before': {
      background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
    },
  },
  memberHeader: {
    padding: theme.spacing(4, 3, 2, 3),
    textAlign: 'center',
    position: 'relative',
  },
  memberAvatar: {
    width: 100,
    height: 100,
    margin: '0 auto',
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    border: '4px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    fontSize: '3rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'scale(1.1) rotate(5deg)',
    },
  },
  ideaAvatar: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    color: '#FFF',
  },
  devAvatar: {
    background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 100%)',
    color: '#FFF',
  },
  helpAvatar: {
    background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
    color: '#FFF',
  },
  roleChip: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#1B4E65',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    fontWeight: 700,
    fontSize: '0.8rem',
    border: '1px solid rgba(27, 78, 101, 0.2)',
  },
  memberName: {
    fontSize: '2.2rem',
    fontWeight: 800,
    color: '#1B4E65',
    fontFamily: '"Amiri", "Tajawal", serif',
    marginBottom: theme.spacing(1),
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
    lineHeight: 1.3,
  },
  memberRole: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#2E6A84',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(2),
  },
  memberDescription: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#2C5F41',
    lineHeight: 1.8,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    textAlign: 'center',
    padding: theme.spacing(0, 2),
  },
  projectInfo: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: 20,
    padding: theme.spacing(5),
    border: '2px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    marginTop: theme.spacing(4),
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 6,
      background: 'linear-gradient(135deg, #1B4E65 0%, #2E6A84 50%, #D4A574 100%)',
    },
  },
  projectTitle: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#1B4E65',
    fontFamily: '"Amiri", "Tajawal", serif',
    marginBottom: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textShadow: '2px 2px 6px rgba(0,0,0,0.1)',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      flexDirection: 'column',
    },
  },
  projectDescription: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#2C5F41',
    lineHeight: 1.8,
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginBottom: theme.spacing(3),
    maxWidth: '800px',
    margin: '0 auto',
  },
  statsGrid: {
    marginTop: theme.spacing(4),
  },
  statBox: {
    textAlign: 'center',
    padding: theme.spacing(2),
  },
  statNumber: {
    fontSize: '2.5rem',
    fontWeight: 800,
    color: '#1B4E65',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    display: 'block',
    textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
  },
  statLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#2E6A84',
    fontFamily: '"Tajawal", "Cairo", sans-serif',
    marginTop: theme.spacing(0.5),
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
      width: 120,
      height: 120,
      top: '15%',
      left: '8%',
      animationDelay: '0s',
    },
    '&:nth-child(2)': {
      width: 80,
      height: 80,
      top: '70%',
      right: '12%',
      animationDelay: '7s',
    },
    '&:nth-child(3)': {
      width: 100,
      height: 100,
      bottom: '25%',
      left: '15%',
      animationDelay: '14s',
    },
    '&:nth-child(4)': {
      width: 60,
      height: 60,
      top: '45%',
      right: '20%',
      animationDelay: '10s',
    },
  },
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
      opacity: 0.3,
    },
    '25%': {
      transform: 'translateY(-20px) rotate(90deg)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'translateY(-30px) rotate(180deg)',
      opacity: 0.7,
    },
    '75%': {
      transform: 'translateY(-10px) rotate(270deg)',
      opacity: 0.5,
    },
  },
  starRating: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    gap: theme.spacing(0.5),
  },
  star: {
    color: '#FFD700',
    fontSize: '2rem',
    filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.2))',
    animation: '$twinkle 2s ease-in-out infinite alternate',
    '&:nth-child(2)': { animationDelay: '0.2s' },
    '&:nth-child(3)': { animationDelay: '0.4s' },
    '&:nth-child(4)': { animationDelay: '0.6s' },
    '&:nth-child(5)': { animationDelay: '0.8s' },
  },
  '@keyframes twinkle': {
    '0%': { opacity: 0.7, transform: 'scale(1)' },
    '100%': { opacity: 1, transform: 'scale(1.1)' },
  },
}));

const IdeaApplication = () => {
  const classes = useStyles();
  const history = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:900px)');

  const handleBack = () => {
    history('/');
  };

  const teamMembers = [
    {
      name: 'عجابي شيماء',
      role: 'صاحبة الفكرة والابتكار',
      icon: <EmojiObjectsIcon />,
      description: 'العقل المبدع وراء فكرة المحلل الذكي في النحو الوظيفي. تحمل رؤية تعليمية حديثة لتبسيط قواعد النحو العربي وجعلها أكثر وضوحاً وفهماً للطلاب.',
      cardClass: 'ideaCard',
      avatarClass: 'ideaAvatar',
      roleLabel: 'الابتكار',
      delay: 0
    },
    {
      name: 'بلخيري علاء الدين',
      role: 'مطور ومبرمج التطبيق',
      icon: <CodeIcon />,
      description: 'المطور الماهر الذي حول الفكرة النظرية إلى واقع رقمي تفاعلي. استخدم أحدث التقنيات في تطوير الواجهات لإنشاء تجربة مستخدم استثنائية.',
      cardClass: 'devCard',
      avatarClass: 'devAvatar',
      roleLabel: 'التطوير',
      delay: 300
    },
    {
      name: 'هماس إسلام',
      role: 'مساعد ومطور مساعد',
      icon: <HelpIcon />,
      description: 'قدم الدعم الفني والمساعدة القيمة في مراحل التطوير المختلفة. ساهم في إثراء المحتوى وتحسين تجربة المستخدم وضمان جودة التطبيق.',
      cardClass: 'helpCard',
      avatarClass: 'helpAvatar',
      roleLabel: 'الدعم',
      delay: 600
    }
  ];

  const projectStats = [
    { number: '10+', label: 'قواعد نحوية' },
    { number: '2024', label: 'سنة التطوير' },
    { number: '3', label: 'أعضاء الفريق' },
    { number: '100%', label: 'مجاني' }
  ];

  return (
    <div className={classes.root}>
      {/* العناصر المتحركة في الخلفية */}
      <div className={classes.floatingElements}>
        <div className={classes.floatingShape}></div>
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

      <Container maxWidth="lg" className={classes.container}>
        <Fade in={true} timeout={1000}>
          <Typography variant="h1" className={classes.pageTitle} dir="rtl">
            <GroupIcon style={{ marginLeft: '24px', fontSize: '4rem', filter: 'drop-shadow(2px 2px 8px rgba(0,0,0,0.3))' }} />
            فريق العمل المبدع
          </Typography>
        </Fade>

        {/* بطاقات أعضاء الفريق */}
        <Box className={classes.teamGrid}>
          {teamMembers.map((member, index) => (
            <Grow
              key={index}
              in={true}
              timeout={1200}
              style={{ transitionDelay: `${member.delay + 800}ms` }}
            >
              <Card className={`${classes.memberCard} ${classes[member.cardClass]}`}>
                <Chip 
                  label={member.roleLabel}
                  className={classes.roleChip}
                />
                
                <Box className={classes.memberHeader}>
                  <Avatar className={`${classes.memberAvatar} ${classes[member.avatarClass]}`}>
                    {member.icon}
                  </Avatar>
                  
                  <Typography className={classes.memberName} dir="rtl">
                    {member.name}
                  </Typography>
                  
                  <Typography className={classes.memberRole} dir="rtl">
                    {member.role}
                  </Typography>
                </Box>
                
                <CardContent>
                  <Typography className={classes.memberDescription} dir="rtl">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grow>
          ))}
        </Box>

        {/* معلومات عن المشروع */}
        <Fade in={true} timeout={1500} style={{ transitionDelay: '1600ms' }}>
          <Box className={classes.projectInfo}>
            <Typography className={classes.projectTitle} dir="rtl">
              <SchoolIcon style={{ marginLeft: '20px', fontSize: '3rem' }} />
              المحلل الذكي في النحو الوظيفي
            </Typography>
            
            <Typography className={classes.projectDescription} dir="rtl">
              مشروع تعليمي طموح يهدف إلى ثورة حقيقية في تعليم النحو العربي. 
              نسعى لتقديم أداة تعليمية تفاعلية وحديثة تجعل تعلم النحو الوظيفي 
              تجربة ممتعة ومثمرة للطلاب والمتعلمين من جميع المستويات.
            </Typography>

            {/* إحصائيات المشروع */}
            <Grid container spacing={2} className={classes.statsGrid}>
              {projectStats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box className={classes.statBox}>
                    <Typography component="span" className={classes.statNumber}>
                      {stat.number}
                    </Typography>
                    <Typography className={classes.statLabel} dir="rtl">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* تقييم بالنجوم */}
            <Box className={classes.starRating}>
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={classes.star} />
              ))}
            </Box>
          </Box>
        </Fade>
      </Container>
    </div>
  );
};

export default IdeaApplication;